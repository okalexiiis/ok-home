import Link from "next/link";
import { notFound } from "next/navigation";
import { getItem } from "@/lib/consumed";
import { ItemForm } from "../../item-form";

export const dynamic = "force-dynamic";

export default async function EditItem({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItem(slug);

  if (!item) notFound();

  return (
    <div className="flex flex-col flex-1 gap-6 selection:bg-green selection:text-background">
      <header className="w-full border-b-4 border-green flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-green font-bold">edit item</h1>
        <Link
          href="/dashboard/consumed"
          className="font-mono text-sm text-foreground-sec hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </header>

      <ItemForm item={item} />
    </div>
  );
}
