import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "thoughts",
  description: "Random thoughts and ideas.",
};
import { getAllPosts } from "@/lib/thoughts";
import { PostList } from "./post-list";


export const dynamic = "force-dynamic";

export default async function Thoughts() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col flex-1 items-center gap-8 md:w-[60%] pt-16 selection:bg-purple selection:text-background">
      <header className="w-full border-b-4 border-purple flex items-center justify-between pb-2">
        <h1 className="font-mono text-4xl text-purple font-bold">thoughts</h1>
        <nav className="flex gap-4 font-mono text-sm text-foreground-sec">
          <Link href="/" className="hover:text-foreground transition-colors">
            home
          </Link>
          <Link href="/consumed" className="hover:text-green transition-colors">
            ← consumed
          </Link>
        </nav>
      </header>

      <PostList posts={posts} />

      <Footer color="purple" />
    </div>
  );
}
