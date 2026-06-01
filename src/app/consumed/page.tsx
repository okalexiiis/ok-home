import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "consumed",
  description: "Manga, movies, shows, and more.",
};
import { ListsSection } from "@/components/shared/lists";
import {
  computeConsumedStats,
  getAllItems,
  pickCurrentlyConsuming,
  pickLastCompleted,
  pickTopPicks,
} from "@/lib/consumed";
import { getListsByContext } from "@/lib/lists";
import { CurrentlyConsuming } from "./currently-consuming";
import { LastCompleted } from "./last-completed";
import { Library } from "./library";
import { Stats } from "./stats";
import { TopPicks } from "./top-picks";


export const dynamic = "force-dynamic";

export default async function Consumed() {
  const [items, lists] = await Promise.all([
    getAllItems(),
    getListsByContext("consumed"),
  ]);
  const stats = computeConsumedStats(items);
  const topPicks = pickTopPicks(items);
  const currentlyConsuming = pickCurrentlyConsuming(items);
  const lastCompleted = pickLastCompleted(items);

  return (
    <div className="flex flex-col flex-1 items-center gap-8 md:w-[60%] pt-16 px-4 md:px-0 selection:bg-green selection:text-background">
      <header className="w-full border-b-4 border-green flex items-center justify-between pb-2">
        <h1 className="font-mono text-2xl md:text-4xl text-green font-bold">consumed</h1>
        <nav className="flex flex-wrap gap-2 md:gap-4 font-mono text-sm text-foreground-sec">
          <Link href="/" className="hover:text-foreground transition-colors">
            home
          </Link>
          <Link href="/games" className="hover:text-orange transition-colors">
            ← games
          </Link>
          <Link
            href="/thoughts"
            className="hover:text-purple transition-colors"
          >
            thoughts →
          </Link>
        </nav>
      </header>

      <Stats total={stats.total} completed={stats.completed} />

      <TopPicks items={topPicks} />

      <CurrentlyConsuming items={currentlyConsuming} />

      <LastCompleted items={lastCompleted} />

      <Library items={items} />
      <ListsSection lists={lists} color="green" />
      <Footer color="green" />
    </div>
  );
}
