import Link from "next/link";
import { ConfirmDelete } from "@/components/dashboard/confirm-delete";
import { formatDate, getAllPosts } from "@/lib/thoughts";
import { removePost } from "./actions";

export const runtime = "edge";

export const dynamic = "force-dynamic";

export default async function ThoughtsDashboard() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col flex-1 gap-8 selection:bg-purple selection:text-background">
      <header className="w-full border-b-4 border-purple flex items-center justify-between pb-2">
        <div>
          <h1 className="font-mono text-3xl text-purple font-bold">thoughts</h1>
          <p className="font-mono text-xs text-foreground-sec mt-1">
            {posts.length} posts
          </p>
        </div>
        <Link
          href="/dashboard/thoughts/new"
          className="font-mono text-sm px-3 py-1.5 border border-purple text-purple hover:bg-purple/20 transition-colors"
        >
          + new
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 border border-dashed border-gray">
          <p className="font-mono text-sm text-foreground-sec">no posts yet.</p>
          <Link
            href="/dashboard/thoughts/new"
            className="font-mono text-sm border border-purple text-purple hover:bg-purple/20 px-4 py-2 transition-colors"
          >
            + write first post
          </Link>
        </div>
      ) : (
        <section className="flex flex-col divide-y divide-gray/40">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg text-foreground truncate">
                  {post.title}
                </span>
                <span className="font-mono text-xs text-foreground-sec">
                  {formatDate(post.date)} ·{" "}
                  {post.tags.map((t) => `#${t}`).join(" ")}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                <Link
                  href={`/dashboard/thoughts/edit/${post.slug}`}
                  className="px-3 py-1.5 border border-gray text-foreground-sec hover:text-purple hover:border-purple/50 transition-colors"
                >
                  edit
                </Link>
                <ConfirmDelete
                  action={removePost}
                  slug={post.slug}
                  label={post.title}
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
