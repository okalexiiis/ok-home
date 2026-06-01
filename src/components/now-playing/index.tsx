import { getNowPlaying, relativeTime } from "@/lib/lastfm";
import { NowPlayingCard } from "./card";

export async function NowPlaying() {
  const track = await getNowPlaying();
  const label = track?.timestamp ? relativeTime(track.timestamp) : "";
  return <NowPlayingCard track={track} label={label} />;
}
