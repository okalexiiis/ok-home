import type { Game } from "@/lib/games";

export function DroppedGames({ games }: { games: Game[] }) {
  if (games.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-mono text-xs text-foreground-sec tracking-widest uppercase">
        dropped
      </h2>
      <div className="flex flex-col divide-y divide-gray/40">
        {games.map((game) => (
          <div key={game.name} className="flex items-center gap-3 h-14">
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-serif text-foreground/50 truncate">
                {game.name}
              </span>
              <span className="font-mono text-xs text-foreground-sec">
                {game.genre}
              </span>
            </div>
            {game.hours && (
              <span className="font-mono text-xs text-foreground-sec shrink-0">
                {game.hours}h
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
