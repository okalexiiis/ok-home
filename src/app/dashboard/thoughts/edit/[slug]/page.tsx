import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/thoughts";
import { PostForm } from "../../post-form";

export const runtime = "edge";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col flex-1 gap-6 selection:bg-purple selection:text-background">
      <header className="w-full border-b-4 border-purple flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-purple font-bold">
          edit thought
        </h1>
        <Link
          href="/dashboard/thoughts"
          className="font-mono text-sm text-foreground-sec hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </header>

      <PostForm post={post} />
    </div>
  );
}
