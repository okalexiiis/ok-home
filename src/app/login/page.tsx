import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "login",
  description: "Dashboard login.",
};

export default function LoginPage() {
  return <LoginForm />;
}
