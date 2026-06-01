"use server";

import { redirect } from "next/navigation";
import { destroySession, validateSession } from "@/lib/auth";

export async function requireAuth() {
  if (!(await validateSession())) redirect("/login");
}

export async function logout() {
  if (!(await validateSession())) redirect("/login");
  await destroySession();
  redirect("/login");
}
