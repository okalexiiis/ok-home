import Link from "next/link";
import { GameForm } from "../game-form";

export const runtime = "edge";

export default function NewGame() {
  return (
    <div className="flex flex-col flex-1 gap-6 selection:bg-orange selection:text-background">
      <header className="w-full border-b-4 border-orange flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-orange font-bold">new game</h1>
        <Link
          href="/dashboard/games"
          className="font-mono text-sm text-foreground-sec hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </header>

      <GameForm />
    </div>
  );
}
