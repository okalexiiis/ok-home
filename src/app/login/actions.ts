"use server";

import { redirect } from "next/navigation";
import { verifyAuth, createSession } from "@/lib/auth";

export type LoginState = { error: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyAuth(password)) {
    return { error: "wrong password" };
  }

  await createSession();
  redirect("/dashboard");
}
