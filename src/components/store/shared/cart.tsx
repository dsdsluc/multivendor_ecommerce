"use client";

import { useCartStore } from "@/cart-store/useCartStore";
import StorageSyncProvider from "@/providers/storage-sync-provider";

export default function CartSyncWrapper() {
  const { setCart } = useCartStore();
  return <StorageSyncProvider onCartChange={setCart} />;
}
