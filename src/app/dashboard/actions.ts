"use server";

import { redirect } from "next/navigation";
import { destroySession, isAuthenticated } from "@/lib/auth";

export async function requireAuth() {
  if (!(await isAuthenticated())) redirect("/login");
}

export async function logout() {
  if (!(await isAuthenticated())) redirect("/login");
  await destroySession();
  redirect("/login");
}
