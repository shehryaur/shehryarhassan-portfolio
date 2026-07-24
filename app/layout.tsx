import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileTopBar from "@/components/MobileTopBar";
import Footer from "@/components/Footer";
import AmbientLight from "@/components/AmbientLight";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Shehryar Hassan - Aspiring AI/Growth PM",
  description:
    "Shehryar Hassan",
  metadataBase: new URL("https://shehryarhassan.me"),
  openGraph: {
    title: "Shehryar Hassan - Aspiring AI/Growth PM",
    description:
      "Aspiring AI/Growth PM",
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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-page text-ink antialiased">
        {/* Ambient light behind everything (z-0). */}
        <AmbientLight />

        {/* Custom directional cursor (z-100, non-interactive). */}
        <CustomCursor />

        {/* Sidebar / mobile top bar (z-30). */}
        <Sidebar />
        <MobileTopBar />

        <main className="relative z-10 flex-1 md:pl-[300px]">
          <div className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
            {children}
          </div>
        </main>

        <div className="relative z-10 md:pl-[300px]">
          <div className="mx-auto max-w-3xl px-6 pb-10 md:px-10">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
