import Link from "next/link";
import { Footer } from "@/components/shared/footer";
import { ListsSection } from "@/components/shared/lists";
import {
  computeGameStats,
  getAllGames,
  pickCurrentlyPlaying,
  pickLastCompleted,
} from "@/lib/games";
import { getListsByContext } from "@/lib/lists";
import { CurrentlyPlaying } from "./currently-playing";
import { LastCompleted } from "./last-completed";
import { Library } from "./library";
import { Stats } from "./stats";

export const runtime = "edge";

export const dynamic = "force-dynamic";

export default async function Games() {
  const [games, lists] = await Promise.all([
    getAllGames(),
    getListsByContext("games"),
  ]);
  const stats = computeGameStats(games);
  const currentlyPlaying = pickCurrentlyPlaying(games);
  const lastCompleted = pickLastCompleted(games);

  return (
    <div className="flex flex-col flex-1 items-center gap-8 md:w-[60%] pt-16 selection:bg-orange selection:text-background">
      <header className="w-full border-b-4 border-orange flex items-center justify-between pb-2">
        <h1 className="font-mono text-4xl text-orange font-bold">games</h1>
        <nav className="flex gap-4 font-mono text-sm text-foreground-sec">
          <Link href="/" className="hover:text-foreground transition-colors">
            home
          </Link>
          <Link href="/music" className="hover:text-blue transition-colors">
            ← previous room
          </Link>
          <Link href="/consumed" className="hover:text-green transition-colors">
            next room →
          </Link>
        </nav>
      </header>

      <Stats
        total={stats.total}
        hours={stats.hours}
        completed={stats.completed}
      />

      {currentlyPlaying && <CurrentlyPlaying game={currentlyPlaying} />}

      <LastCompleted games={lastCompleted} />

      <Library games={games} />
      <ListsSection lists={lists} color="orange" />
      <Footer color="orange" />
    </div>
  );
}
