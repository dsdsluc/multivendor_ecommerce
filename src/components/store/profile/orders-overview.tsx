import Link from "next/link";
import { AppealIcon, ArrowIcon, DollarIcon } from "@/components/store/icons";

import Image from "next/image";
export default function OrdersOverview() {
  return (
    <div className="mt-4 bg-white p-4 border shadow-sm">
      <div className="flex items-center border-b">
        <div className="inline-block flex-1 py-3 text-xl font-bold">
          My Orders
        </div>
        <Link href="/profile/orders">
          <div className="flex items-center text-main-primary text-sm cursor-pointer">
            View All
            <span className="ml-2 text-lg inline-block">
              <ArrowIcon />
            </span>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8">
        {menu.map((item) => (
          <Link key={item.link} href={item.link}>
            <div className="relative w-full flex flex-col justify-center items-center cursor-pointer">
              <Image
                src={item.img}
                alt={item.title}
                width={100}
                height={100}
                className="w-14 h-14 object-cover"
              />
              <div className="text-main-primary">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="relative flex items-center py-4 border-t cursor-pointer">
        <span className="text-2xl inline-block">
          <AppealIcon />
        </span>
        <div className="ml-1.5 text-main-primary">My appeal</div>
        <span className="absolute right-0 text-main-secondary text-lg">
          <ArrowIcon />
        </span>
      </div>
      <div className="relative flex items-center py-4 border-t cursor-pointer">
        <span className="text-2xl inline-block">
          <DollarIcon />
        </span>
        <div className="ml-1.5 text-main-primary">In dispute</div>
        <span className="absolute right-0 text-main-secondary text-lg">
          <ArrowIcon />
        </span>
      </div>
    </div>
  );
}
const menu = [
  {
    title: "Unpaid",
    img: "/assets/images/unpaid.avif",
    link: "/profile/orders/unpaid",
  },
  {
    title: "To be shipped",
    img: "/assets/images/to-be-shipped.avif",
    link: "/profile/orders/toShip",
  },
  {
    title: "Shipped",
    img: "/assets/images/shipped.avif",
    link: "/profile/orders/shipped",
  },
  {
    title: "Delivered",
    img: "/assets/images/to-de-reviewed.webp",
    link: "/profile/orders/delivered",
  },
];
