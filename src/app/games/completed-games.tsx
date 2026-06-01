import type { Game } from "@/lib/games";

export function CompletedGames({ games }: { games: Game[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        completed
      </h2>
      <div className="flex flex-col divide-y divide-gray/40">
        {games.map((game, i) => (
          <div key={game.name} className="flex items-center gap-3 h-14">
            <span className="font-mono text-sm text-orange w-6 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-serif text-foreground truncate">
                {game.name}
              </span>
              <span className="font-mono text-xs text-foreground-sec">
                {game.genre}
              </span>
            </div>
            <div className="flex flex-col items-end shrink-0">
              {game.rating && (
                <span className="font-mono text-sm text-orange">
                  {game.rating}/10
                </span>
              )}
              {game.hours && (
                <span className="font-mono text-xs text-foreground-sec">
                  {game.hours}h
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
