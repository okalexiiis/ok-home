import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/nav";
import { validateSession } from "@/lib/auth";


export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await validateSession())) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1 w-full md:w-[60%] pt-12 pb-24">
      <DashboardNav />
      {children}
    </div>
  );
}
