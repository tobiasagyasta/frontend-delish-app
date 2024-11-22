/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delish!",
  description: "Delish App Reviews Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      </head> */}
      <body
        className={`${inter.className} antialiased w-fit md:w-[600px] mx-auto flex flex-col justify-start items-center border border-x-gray-400/15 border-t-0 min-h-screen overflow-y-auto`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
