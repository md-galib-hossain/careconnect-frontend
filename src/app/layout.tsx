import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
           <AppRouterCacheProvider>
            <>
            <Toaster position="top-center"/>
            {children}
            </>
           </AppRouterCacheProvider>
        </body>
      </html>
    </Providers>
  );
}
