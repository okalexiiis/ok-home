import Link from "next/link";
import { getAllItems } from "@/lib/consumed";
import { getAllGames } from "@/lib/games";
import { getAllLists } from "@/lib/lists";
import { getCurrentPick } from "@/lib/music-pick";
import { getAllPosts } from "@/lib/thoughts";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

const sections = [
  { name: "thoughts", href: "/dashboard/thoughts", accent: "purple" },
  { name: "games", href: "/dashboard/games", accent: "orange" },
  { name: "consumed", href: "/dashboard/consumed", accent: "green" },
  { name: "music", href: "/dashboard/music", accent: "blue" },
  { name: "lists", href: "/dashboard/lists", accent: "yellow" },
] as const;

const accentClasses: Record<string, string> = {
  purple: "border-t-purple hover:border-purple text-purple",
  orange: "border-t-orange hover:border-orange text-orange",
  green: "border-t-green hover:border-green text-green",
  blue: "border-t-blue hover:border-blue text-blue",
  yellow: "border-t-yellow hover:border-yellow text-yellow",
};

export default async function Dashboard() {
  const [posts, games, items, pick, lists] = await Promise.all([
    getAllPosts(),
    getAllGames(),
    getAllItems(),
    getCurrentPick(),
    getAllLists(),
  ]);

  const counts: Record<string, number> = {
    thoughts: posts.length,
    games: games.length,
    consumed: items.length,
    music: pick ? 1 : 0,
    lists: lists.length,
  };

  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-purple selection:text-background">
      <header className="w-full border-b-4 border-purple flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-purple font-bold">dashboard</h1>
        <div className="flex items-center gap-3 font-mono text-sm">
          <Link
            href="/"
            className="text-foreground-sec hover:text-foreground transition-colors"
          >
            view site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="px-3 py-1.5 border border-gray text-foreground-sec hover:text-red hover:border-red/50 transition-colors cursor-pointer"
            >
              logout
            </button>
          </form>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className={`flex flex-col gap-2 border border-gray border-t-4 p-5 transition-colors ${accentClasses[s.accent]}`}
          >
            <span className="font-mono text-2xl font-bold">
              {counts[s.name]}
            </span>
            <span className="font-mono text-sm text-foreground">{s.name}</span>
            <span className="font-mono text-xs text-foreground-sec">
              manage →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
