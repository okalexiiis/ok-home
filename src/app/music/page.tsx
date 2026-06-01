import Link from "next/link";
import { Footer } from "@/components/shared/footer";
import { ListsSection } from "@/components/shared/lists";
import {
  getRecentTracks,
  getTopAlbums,
  getTopArtists,
  getTopTracks,
} from "@/lib/lastfm";
import { getListsByContext } from "@/lib/lists";
import { getCurrentPick, getCurrentPlaylist } from "@/lib/music-pick";
import { MusicPickCard, MusicPlaylistCard } from "./pick";
import { RecentScrobbles } from "./recent-scrobbles";
import { TopAlbums } from "./top-albums";
import { TopArtists } from "./top-artists";
import { TopSongs } from "./top-songs";

export default async function Music() {
  const [tracks, topTracks, topAlbums, artists, pick, playlist, lists] =
    await Promise.all([
      getRecentTracks(5),
      getTopTracks(5),
      getTopAlbums(5),
      getTopArtists(5),
      getCurrentPick(),
      getCurrentPlaylist(),
      getListsByContext("music"),
    ]);

  const hasPicks = pick || playlist;

  return (
    <div className="flex flex-col flex-1 items-center gap-8 md:w-[60%] pt-16 selection:bg-blue selection:text-background">
      <header className="w-full border-b-4 border-blue flex items-center justify-between pb-2">
        <h1 className="font-mono text-4xl text-blue font-bold">music</h1>
        <nav className="flex gap-4 font-mono text-sm text-foreground-sec">
          <Link href="/" className="hover:text-foreground transition-colors">
            home
          </Link>
          <Link href="/games" className="hover:text-orange transition-colors">
            next room →
          </Link>
        </nav>
      </header>

      {hasPicks ? (
        <div className="grid grid-cols-2 gap-8 w-full items-start">
          <RecentScrobbles tracks={tracks} />
          <div className="flex flex-col gap-4">
            {pick && <MusicPickCard pick={pick} />}
            {playlist && <MusicPlaylistCard playlist={playlist} />}
          </div>
        </div>
      ) : (
        <RecentScrobbles tracks={tracks} />
      )}

      <div className="grid grid-cols-3 gap-8 w-full border-b border-foreground/10 pb-4">
        <TopSongs tracks={topTracks} />
        <TopAlbums albums={topAlbums} />
        <TopArtists artists={artists} />
      </div>
      <ListsSection lists={lists} color="blue" />
      <Footer color="blue" />
    </div>
  );
}
