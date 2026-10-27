import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileTopBar from "@/components/MobileTopBar";
import AmbientLight from "@/components/AmbientLight";
import DirectionalCursor from "@/components/DirectionalCursor";

// Handwriting accent font, exposed as --font-hand for the .hand class.
const hand = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "Shehryar Hassan - AI Product Builder",
  description:
    "Shehryar Hassan builds AI products end to end: user research, specs, and shipped code. Minerva University, San Francisco.",
  metadataBase: new URL("https://shehryarhassan.me"),
  openGraph: {
    title: "Shehryar Hassan - AI Product Builder",
    description:
      "AI products end to end: user research, specs, and shipped code.",
    url: "https://shehryarhassan.me",
    siteName: "shehryarhassan.me",
    type: "website",
  },
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={hand.variable}>
      <body className="min-h-screen flex flex-col bg-page text-ink antialiased">
        {/* Ambient light behind everything (z-0). */}
        <AmbientLight />
        <DirectionalCursor />

        {/* Sidebar / mobile top bar (z-30). */}
        <Sidebar />
        <MobileTopBar />

        <main className="relative z-10 flex-1 md:pl-[300px]">
          <div className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
