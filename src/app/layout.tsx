// Next JS
import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";

// Global styles
import "./globals.css";
import { ThemeProvider } from "next-themes";

// Clerk Provider
import { ClerkProvider } from "@clerk/nextjs";

// Fonts
const inter = Inter({ subsets: ["latin"] });
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-barlow",
});

// Metadata
export const metadata: Metadata = {
  title: "GoShop",
  description: "Welcome to GoShop, your one-stop online shopping destination!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${barlow.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
