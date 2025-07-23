import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const user = await currentUser();
  console.log("Current User:", user);
  if (user?.privateMetadata?.role === "USER") redirect("/");
  if (user?.privateMetadata?.role === "ADMIN") redirect("/dashboard/admin");
  if (user?.privateMetadata?.role === "SELLER") redirect("/dashboard/seller");
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
