"use client";

import { useEffect } from "react";

export default function StorageSyncProvider({
  onCartChange,
}: {
  onCartChange: (cart: any[]) => void;
}) {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cart") {
        try {
          const parsedValue = event.newValue
            ? JSON.parse(event.newValue)
            : null;
          if (parsedValue?.state?.cart) {
            onCartChange(parsedValue.state.cart);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [onCartChange]);

  return null; // Component này chỉ để lắng nghe, không render gì
}
