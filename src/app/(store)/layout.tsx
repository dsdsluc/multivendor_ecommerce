// React
import CartSyncWrapper from "@/components/store/shared/cart";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

// Toaster
import { Toaster } from "react-hot-toast";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <CartSyncWrapper />
      <div>
        <div>{children}</div>
        <Toaster position="top-center" />
      </div>
    </ClerkProvider>
  );
}
