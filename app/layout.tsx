import "@/styles/globals.css";
import { Metadata } from "next";
import { Spinner } from "@nextui-org/spinner";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";

import { FC, PropsWithChildren, Suspense } from "react";

import AppLayout from "@/components/appLayout";
import { Toaster } from "@/components/ui/sonner";
import Vercel from "@/components/vercel";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/icons/logo.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [{ name: "Bhuvan BM", url: "https://github.com/crazytweeks" }],
};

type ParallelRoutes = {
  models: React.ReactNode;
};

const RootLayout: FC<PropsWithChildren<ParallelRoutes>> = ({
  children,
  models,
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Vercel />
        <Toaster />
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                <Spinner />
              </div>
            }
          >
            <AppLayout>
              {children}
              {models}
            </AppLayout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
