import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { formatDate, getPost } from "@/lib/thoughts";
import { PostBody } from "../post-body";


export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "not found" };
  return { title: `${post.title} — thoughts`, description: post.excerpt };
}

export default async function ThoughtPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <article className="flex flex-col flex-1 items-center gap-8 md:w-[60%] pt-16 selection:bg-purple selection:text-background">
      <nav className="font-mono text-sm">
        <Link
          href="/thoughts"
          className="text-foreground-sec hover:text-purple transition-colors"
        >
          ← all thoughts
        </Link>
      </nav>

      <header className="flex flex-col gap-3 border-b-4 border-purple pb-4">
        <h1 className="font-serif text-4xl text-foreground">{post.title}</h1>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-foreground-sec">
            {formatDate(post.date)}
          </span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-purple">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <PostBody body={post.body} />
      <Footer color="purple" />
    </article>
  );
}
