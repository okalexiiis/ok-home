import Link from "next/link";
import { PostForm } from "../post-form";

export const runtime = "edge";

export default function NewPost() {
  return (
    <div className="flex flex-col flex-1 gap-6 selection:bg-purple selection:text-background">
      <header className="w-full border-b-4 border-purple flex items-center justify-between pb-2">
        <h1 className="font-mono text-3xl text-purple font-bold">
          new thought
        </h1>
        <Link
          href="/dashboard/thoughts"
          className="font-mono text-sm text-foreground-sec hover:text-foreground transition-colors"
        >
          ← back
        </Link>
      </header>

      <PostForm />
    </div>
  );
}
