import Link from "next/link";
import { ConfirmDelete } from "@/components/dashboard/confirm-delete";
import { getAllItems } from "@/lib/consumed";
import { removeItem } from "./actions";

export const runtime = "edge";

export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  consuming: "text-green",
  completed: "text-mint",
  pending: "text-yellow",
  dropped: "text-red",
};

export default async function ConsumedDashboard() {
  const items = await getAllItems();

  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-green selection:text-background">
      <header className="w-full border-b-4 border-green flex items-center justify-between pb-2">
        <div>
          <h1 className="font-mono text-3xl text-green font-bold">consumed</h1>
          <p className="font-mono text-xs text-foreground-sec mt-1">
            {items.length} items
          </p>
        </div>
        <Link
          href="/dashboard/consumed/new"
          className="font-mono text-sm px-3 py-1.5 border border-green text-green hover:bg-green/20 transition-colors"
        >
          + new
        </Link>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 border border-dashed border-gray">
          <p className="font-mono text-sm text-foreground-sec">nothing yet.</p>
          <Link
            href="/dashboard/consumed/new"
            className="font-mono text-sm border border-green text-green hover:bg-green/20 px-4 py-2 transition-colors"
          >
            + add first item
          </Link>
        </div>
      ) : (
        <section className="flex flex-col divide-y divide-gray/40">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg text-foreground truncate">
                  {item.name}
                  {item.pickRank ? (
                    <span className="font-mono text-xs text-green ml-2">
                      ★ #{item.pickRank}
                    </span>
                  ) : null}
                </span>
                <span className="font-mono text-xs text-foreground-sec">
                  <span className="text-green">{item.type}</span> ·{" "}
                  <span className={statusColor[item.status]}>
                    {item.status}
                  </span>{" "}
                  · {item.genres.join(", ")}
                  {item.rating ? ` · ${item.rating}/10` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                <Link
                  href={`/dashboard/consumed/edit/${item.slug}`}
                  className="px-3 py-1.5 border border-gray text-foreground-sec hover:text-green hover:border-green/50 transition-colors"
                >
                  edit
                </Link>
                <ConfirmDelete
                  action={removeItem}
                  slug={item.slug}
                  label={item.name}
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
