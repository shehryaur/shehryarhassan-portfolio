import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileTopBar from "@/components/MobileTopBar";
import AmbientLight from "@/components/AmbientLight";
import { rotationTimeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shehryar Hassan - AI Product Builder",
  description:
    "Shehryar Hassan: Turning code into products people actually use. Minerva University.",
  metadataBase: new URL("https://shehryarhassan.me"),
  openGraph: {
    title: "Shehryar Hassan - AI Product Builder",
    description:
      "Turning code into products people actually use.",
    url: "https://shehryarhassan.me",
    siteName: "shehryarhassan.me",
    type: "website",
    // Shown when the link is shared (LinkedIn, Slack, iMessage)
    images: [{ url: "/avatar.webp", width: 896, height: 1152, alt: "Shehryar Hassan" }],
  },
  twitter: { card: "summary", images: ["/avatar.webp"] },
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

        {/* Sidebar / mobile top bar (z-30). */}
        <Sidebar />
        <MobileTopBar />

        <main className="relative z-10 flex-1 md:pl-[300px]">
          <div className="max-w-3xl px-6 py-10 md:px-12 md:py-14">
            {children}

            {/* Mobile rotation footer */}
            <footer className="mt-16 border-t border-line/70 pt-8 pb-10 md:hidden">
              <div className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-soft">
                Rotation
              </div>
              <div className="space-y-1.5 font-mono text-[12.5px]">
                {rotationTimeline.map((item) => (
                  <div key={item.year} className="flex items-baseline gap-2.5">
                    <span className="text-mute tabular-nums shrink-0">{item.year}</span>
                    <span className="text-ink/80">{item.location}</span>
                  </div>
                ))}
              </div>
            </footer>
          </div>
        </main>
      </body>
    </html>
  );
}
