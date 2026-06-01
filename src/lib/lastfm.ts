const LASTFM_API = "https://ws.audioscrobbler.com/2.0";
const LASTFM_USER = "okalexiiis";

export interface Track {
  name: string;
  artist: string;
  album: string;
  image: string | null;
  isNowPlaying: boolean;
  timestamp: number | null;
}

export interface Artist {
  name: string;
  playcount: number;
  image: string | null;
}

interface LastFmImage {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

interface LastFmTrack {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: LastFmImage[];
  date?: { uts: string };
  "@attr"?: { nowplaying: "true" };
}

interface LastFmArtist {
  name: string;
  playcount: string;
  image: LastFmImage[];
}

interface LastFmAlbum {
  name: string;
  artist: { name: string };
  playcount: string;
  image: LastFmImage[];
}

export interface TopAlbum {
  name: string;
  artist: string;
  playcount: number;
  image: string | null;
}

interface LastFmTopTrack {
  name: string;
  playcount: string;
  artist: { name: string };
  image: LastFmImage[];
}

export interface TopTrack {
  name: string;
  artist: string;
  playcount: number;
  image: string | null;
}

function parseTrack(raw: LastFmTrack): Track {
  const isNowPlaying = raw["@attr"]?.nowplaying === "true";
  return {
    name: raw.name,
    artist: raw.artist["#text"],
    album: raw.album["#text"],
    image:
      raw.image.find((img) => img.size === "extralarge")?.["#text"] || null,
    isNowPlaying,
    timestamp: isNowPlaying
      ? null
      : raw.date
        ? Number(raw.date.uts) * 1000
        : null,
  };
}

function apiUrl(method: string, params: Record<string, string>): string {
  const apiKey = process.env.LAST_FM_API_KEY?.trim() ?? "";
  const url = new URL(LASTFM_API);
  url.searchParams.set("method", method);
  url.searchParams.set("user", LASTFM_USER);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url.toString();
}

export function relativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export async function getNowPlaying(): Promise<Track | null> {
  if (!process.env.LAST_FM_API_KEY) return null;
  const res = await fetch(apiUrl("user.getrecenttracks", { limit: "1" }), {
    next: { revalidate: 30 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const raw: LastFmTrack | undefined = data.recenttracks?.track?.[0];
  return raw ? parseTrack(raw) : null;
}

export async function getRecentTracks(limit = 5): Promise<Track[]> {
  if (!process.env.LAST_FM_API_KEY) return [];
  const res = await fetch(
    apiUrl("user.getrecenttracks", { limit: String(limit + 1) }),
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) return [];
  const data = await res.json();
  const raws: LastFmTrack[] = data.recenttracks?.track ?? [];
  return raws.slice(0, limit).map(parseTrack);
}

export async function getTopTracks(limit = 5): Promise<TopTrack[]> {
  if (!process.env.LAST_FM_API_KEY) return [];
  const res = await fetch(
    apiUrl("user.gettoptracks", { period: "1month", limit: String(limit) }),
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return [];
  const data = await res.json();
  const raws: LastFmTopTrack[] = data.toptracks?.track ?? [];
  return raws.map((raw) => ({
    name: raw.name,
    artist: raw.artist.name,
    playcount: Number(raw.playcount),
    image:
      raw.image.find((img) => img.size === "extralarge")?.["#text"] || null,
  }));
}

export async function getTopAlbums(limit = 5): Promise<TopAlbum[]> {
  if (!process.env.LAST_FM_API_KEY) return [];
  const res = await fetch(
    apiUrl("user.gettopalbums", { period: "1month", limit: String(limit) }),
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return [];
  const data = await res.json();
  const raws: LastFmAlbum[] = data.topalbums?.album ?? [];
  return raws.map((raw) => ({
    name: raw.name,
    artist: raw.artist.name,
    playcount: Number(raw.playcount),
    image:
      raw.image.find((img) => img.size === "extralarge")?.["#text"] || null,
  }));
}

export async function getTopArtists(limit = 5): Promise<Artist[]> {
  if (!process.env.LAST_FM_API_KEY) return [];
  const res = await fetch(
    apiUrl("user.gettopartists", { period: "1month", limit: String(limit) }),
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) return [];
  const data = await res.json();
  const raws: LastFmArtist[] = data.topartists?.artist ?? [];
  return raws.map((raw) => ({
    name: raw.name,
    playcount: Number(raw.playcount),
    image:
      raw.image.find((img) => img.size === "extralarge")?.["#text"] || null,
  }));
}
