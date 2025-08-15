import { redirect } from "next/navigation";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// db
import { db } from "@/lib/db";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Header from "@/components/dashboard/header/header";
export default async function SellerStoreDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the current user. If the user is not authenticated, redirect them to the home page.
  const user = await currentUser();
  if (!user) {
    redirect("/");
    return; // Ensure no further code is executed after redirect
  }

  // Retrieve the list of stores associated with the authenticated user.
  const stores = await db.store.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="h-full w-full flex">
      <Sidebar stores={stores} />
      <div className="w-full ml-[300px]">
        <Header />
        <div className="w-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
}
