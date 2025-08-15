"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { icons } from "@/contants/icons";
import { DashboardSidebarMenuInterface } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavSeller({
  menuLinks,
}: {
  menuLinks: DashboardSidebarMenuInterface[];
}) {
  let pathName = usePathname();
  const storeUrlStart = pathName.split("/stores/")[1];
  const activeStore = storeUrlStart ? storeUrlStart.split("/")[0] : "";
  return (
    <nav className="relative grow ">
      <Command className="rounded-lg overflow-hidden bg-transparent scrollbar-hide ">
        <CommandInput placeholder="Search..." />
        <CommandList className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <CommandEmpty>No Links Found.</CommandEmpty>
          <CommandGroup className="overflow-hidden pt-0 relative">
            {menuLinks.map((link, index) => {
              let icon;
              const searchIcon = icons.find((icon) => icon.value === link.icon);
              if (searchIcon) icon = <searchIcon.path />;
              return (
                <CommandItem
                  key={index}
                  className={cn("w-full h-12 cursor-pointer mt-1", {
                    "bg-accent text-accent-foreground":
                      link.link === ""
                        ? (pathName = `/dashboard/seller/stores/${activeStore}`)
                        : pathName ===
                          `/dashboard/seller/stores/${activeStore}/${link.link}`,
                  })}
                >
                  <Link
                    href={`/dashboard/seller/stores/${activeStore}/${link.link}`}
                    className="flex items-center gap-2 hover:gb-transparent transition-all duration-200 ease-in-out rouded-md w-full"
                  >
                    {icon}
                    <span>{link.label}</span>
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </nav>
  );
}
