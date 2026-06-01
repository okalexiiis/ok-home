import Link from "next/link";
import { ConfirmDelete } from "@/components/dashboard/confirm-delete";
import { getAllGames } from "@/lib/games";
import { removeGame } from "./actions";


export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  playing: "text-orange",
  completed: "text-green",
  pending: "text-yellow",
  dropped: "text-red",
};

export default async function GamesDashboard() {
  const games = await getAllGames();

  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-orange selection:text-background">
      <header className="w-full border-b-4 border-orange flex items-center justify-between pb-2">
        <div>
          <h1 className="font-mono text-3xl text-orange font-bold">games</h1>
          <p className="font-mono text-xs text-foreground-sec mt-1">
            {games.length} games
          </p>
        </div>
        <Link
          href="/dashboard/games/new"
          className="font-mono text-sm px-3 py-1.5 border border-orange text-orange hover:bg-orange/20 transition-colors"
        >
          + new
        </Link>
      </header>

      {games.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 border border-dashed border-gray">
          <p className="font-mono text-sm text-foreground-sec">no games yet.</p>
          <Link
            href="/dashboard/games/new"
            className="font-mono text-sm border border-orange text-orange hover:bg-orange/20 px-4 py-2 transition-colors"
          >
            + add first game
          </Link>
        </div>
      ) : (
        <section className="flex flex-col divide-y divide-gray/40">
          {games.map((game) => (
            <div
              key={game.slug}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg text-foreground truncate">
                  {game.name}
                </span>
                <span className="font-mono text-xs text-foreground-sec">
                  <span className={statusColor[game.status]}>
                    {game.status}
                  </span>{" "}
                  · {game.genre} · {game.platform}
                  {game.rating ? ` · ${game.rating}/10` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                <Link
                  href={`/dashboard/games/edit/${game.slug}`}
                  className="px-3 py-1.5 border border-gray text-foreground-sec hover:text-orange hover:border-orange/50 transition-colors"
                >
                  edit
                </Link>
                <ConfirmDelete
                  action={removeGame}
                  slug={game.slug}
                  label={game.name}
                  bordered
                />
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
