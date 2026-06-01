import { notFound } from "next/navigation";
import { getList } from "@/lib/lists";
import { ListForm } from "../../list-form";


export const dynamic = "force-dynamic";

export default async function EditList({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = await getList(slug);
  if (!list) notFound();

  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-yellow selection:text-background">
      <header className="w-full border-b-4 border-yellow flex items-center pb-2">
        <h1 className="font-mono text-3xl text-yellow font-bold">edit list</h1>
      </header>
      <ListForm list={list} />
    </div>
  );
}
