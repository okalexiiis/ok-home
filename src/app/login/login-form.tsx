"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: "" });

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full max-w-sm selection:bg-purple selection:text-background">
      <header className="w-full border-b-4 border-purple pb-2">
        <h1 className="font-mono text-3xl text-purple font-bold">dashboard</h1>
        <p className="font-mono text-xs text-foreground-sec mt-1">
          enter password to continue
        </p>
      </header>

      <form action={action} className="w-full flex flex-col gap-4">
        <input
          type="password"
          name="password"
          placeholder="password"
          aria-label="Password"
          className="no-ring h-12 w-full bg-transparent border-b-2 border-gray focus:border-purple outline-none px-2 font-mono text-foreground transition-colors"
        />

        {state.error && (
          <p className="font-mono text-xs text-red">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="h-11 font-mono text-sm border border-purple text-purple hover:bg-purple/20 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pending ? "..." : "enter"}
        </button>
      </form>
    </div>
  );
}
