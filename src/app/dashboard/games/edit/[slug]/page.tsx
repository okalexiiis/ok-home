import Link from "next/link";
import { notFound } from "next/navigation";
import { getGame } from "@/lib/games";
import { GameForm } from "../../game-form";


export const dynamic = "force-dynamic";

export default async function EditGame({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) notFound();

  return (
    <div className="flex flex-col flex-1 gap-6 selection:bg-orange selection:text-background">
      <header className="w-full border-b-4 border-orange flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-orange font-bold">edit game</h1>
        <Link
          href="/dashboard/games"
          className="font-mono text-sm text-foreground-sec hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </header>

      <GameForm game={game} />
    </div>
  );
}
