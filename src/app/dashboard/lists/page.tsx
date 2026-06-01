import Link from "next/link";
import { ConfirmDelete } from "@/components/dashboard/confirm-delete";
import { getAllLists } from "@/lib/lists";
import { removeList } from "./actions";

export const runtime = "edge";

export const dynamic = "force-dynamic";

const contextColor: Record<string, string> = {
  games: "text-orange",
  consumed: "text-green",
  music: "text-blue",
};

export default async function ListsDashboard() {
  const lists = await getAllLists();

  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-yellow selection:text-background">
      <header className="w-full border-b-4 border-yellow flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-yellow font-bold">lists</h1>
        <Link
          href="/dashboard/lists/new"
          className="font-mono text-sm border border-yellow text-yellow hover:bg-yellow/20 px-4 py-1.5 transition-colors"
        >
          + new
        </Link>
      </header>

      {lists.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 border border-dashed border-gray">
          <p className="font-mono text-sm text-foreground-sec">no lists yet.</p>
          <Link
            href="/dashboard/lists/new"
            className="font-mono text-sm border border-yellow text-yellow hover:bg-yellow/20 px-4 py-2 transition-colors"
          >
            + create first one
          </Link>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray/40">
          {lists.map((list) => (
            <div
              key={list.slug}
              className="flex items-center justify-between py-4 gap-4"
            >
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-mono text-sm text-foreground truncate">
                  {list.title}
                </p>
                <div className="flex gap-3">
                  <span
                    className={`font-mono text-xs ${contextColor[list.context]}`}
                  >
                    {list.context}
                  </span>
                  <span className="font-mono text-xs text-foreground-sec">
                    {list.mode}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href={`/dashboard/lists/edit/${list.slug}`}
                  className="font-mono text-xs text-foreground-sec hover:text-foreground transition-colors"
                >
                  edit
                </Link>
                <ConfirmDelete
                  action={removeList}
                  slug={list.slug}
                  label={list.title}
                  context={list.context}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
