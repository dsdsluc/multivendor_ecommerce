// Logo
import Logo from "@/components/shared/logo";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// User
import UserInfo from "./user-info";

import { FC } from "react";

// Sidebar
import SidebarNavAdmin from "./nav-admin";
import SidebarNavSeller from "./nav-seller";

// Data options for sidebar
import {
  adminDashboardSidebarOptions,
  SellerDashboardSidebarOptions,
} from "@/contants/data";

// Prisma
import { Store } from "@/generated/prisma";
import StoreSwitcher from "./store-switcher";

interface SidebarProps {
  isAdmin?: boolean;
  stores?: Store[];
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin, stores }) => {
  const user = await currentUser();
  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0 overflow-visible">
      <Logo width="160px" height="90px" />
      <span className="mt-3" />
      {user && <UserInfo user={user} />}
      {!isAdmin && stores && <StoreSwitcher stores={stores} />}
      {isAdmin ? (
        <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />
      ) : (
        <SidebarNavSeller menuLinks={SellerDashboardSidebarOptions} />
      )}
    </div>
  );
};

export default Sidebar;
