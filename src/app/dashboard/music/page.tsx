import { getCurrentPick, getCurrentPlaylist } from "@/lib/music-pick";
import { PickForm } from "./pick-form";
import { PlaylistForm } from "./playlist-form";

export const dynamic = "force-dynamic";

export default async function MusicDashboard() {
  const [pick, playlist] = await Promise.all([
    getCurrentPick(),
    getCurrentPlaylist(),
  ]);

  return (
    <div className="flex flex-col flex-1 gap-12 selection:bg-blue selection:text-background">
      <div className="flex flex-col gap-8">
        <header className="w-full border-b-4 border-blue flex items-center pb-2">
          <h1 className="font-mono text-3xl text-blue font-bold">pick</h1>
        </header>
        <PickForm pick={pick ?? undefined} />
      </div>

      <div className="flex flex-col gap-8">
        <header className="w-full border-b border-foreground/20 flex items-center pb-2">
          <h2 className="font-mono text-xl text-blue font-bold">playlist</h2>
        </header>
        <PlaylistForm playlist={playlist ?? undefined} />
      </div>
    </div>
  );
}
