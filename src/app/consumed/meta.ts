import type { ConsumedItem } from "@/lib/consumed";

export function getMeta(item: ConsumedItem): string {
  const parts: string[] = [];
  if (item.year) parts.push(String(item.year));
  if (item.creator) parts.push(item.creator);
  if (item.studio) parts.push(item.studio);
  if (item.episodes) parts.push(`${item.episodes} eps`);
  if (item.chapters) parts.push(`${item.chapters} ch`);
  if (item.volumes) parts.push(`${item.volumes} vol`);
  return parts.join(" · ");
}
