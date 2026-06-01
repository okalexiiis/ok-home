import Link from "next/link";
import { ItemForm } from "../item-form";

export default function NewItem() {
  return (
    <div className="flex flex-col flex-1 gap-6 selection:bg-green selection:text-background">
      <header className="w-full border-b-4 border-green flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-green font-bold">new item</h1>
        <Link
          href="/dashboard/consumed"
          className="font-mono text-sm text-foreground-sec hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </header>

      <ItemForm />
    </div>
  );
}
