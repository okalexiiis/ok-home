import { ChevronRight } from "lucide-react";
import type { ItemList } from "@/lib/lists";

const colorMap: Record<string, string> = {
  blue: "text-blue",
  orange: "text-orange",
  green: "text-green",
  purple: "text-purple",
  yellow: "text-yellow",
};

function TiersDisplay({
  list,
  accentColor,
}: {
  list: ItemList;
  accentColor: string;
}) {
  const filled = list.tiers.filter((t) => t.items.length > 0);
  return (
    <div className="flex flex-col divide-y divide-foreground/10 border border-foreground/10">
      {filled.map((tier) => (
        <div key={tier.label} className="flex">
          <div
            className={`font-mono text-sm font-bold ${accentColor} w-10 shrink-0 flex items-center justify-center border-r border-foreground/10 py-3`}
          >
            {tier.label}
          </div>
          <div className="px-4 py-3 flex flex-wrap gap-x-5 gap-y-1">
            {tier.items.map((item) => (
              <span key={item} className="font-serif text-sm text-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function OrderedListDisplay({ list }: { list: ItemList }) {
  return (
    <div className="flex flex-col divide-y divide-foreground/10">
      {list.items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: numbered list, position is part of the display
        <div key={`${item}-${i}`} className="flex items-baseline gap-4 py-2">
          <span className="font-mono text-xs text-foreground-sec w-5 shrink-0 text-right">
            {i + 1}
          </span>
          <span className="font-serif text-sm text-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}

function itemCount(list: ItemList): number {
  if (list.mode === "list") return list.items.length;
  return list.tiers.reduce((acc, t) => acc + t.items.length, 0);
}

export function ListsSection({
  lists,
  color,
}: {
  lists: ItemList[];
  color: string;
}) {
  if (lists.length === 0) return null;

  const accentColor = colorMap[color] ?? "text-foreground";

  return (
    <div className="w-full flex flex-col gap-2">
      {lists.map((list) => (
        <details
          key={list.slug}
          className="group border border-foreground/10 open:border-foreground/20 transition-colors"
        >
          <summary className="list-none flex items-center justify-between px-5 py-4 cursor-pointer select-none">
            <div className="flex flex-col gap-0.5">
              <span
                className={`font-mono text-xs tracking-widest uppercase ${accentColor}`}
              >
                {list.title}
              </span>
              {list.description && (
                <span className="font-serif text-xs text-foreground-sec">
                  {list.description}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-foreground-sec">
                {itemCount(list)} items
              </span>
              <ChevronRight
                className={`w-3 h-3 text-foreground-sec transition-transform duration-200 group-open:rotate-90`}
              />
            </div>
          </summary>

          <div className="px-5 pb-5">
            {list.mode === "tiers" ? (
              <TiersDisplay list={list} accentColor={accentColor} />
            ) : (
              <OrderedListDisplay list={list} />
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
