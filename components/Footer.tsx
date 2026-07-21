"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const formatSanFranciscoTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "America/Los_Angeles",
    timeZoneName: "short",
  }).format(date);
};

/**
 * Site-wide footer. Copy line reads "Made by Shehryar | 2026".
 */
export default function Footer() {
  const [time, setTime] = useState(() => formatSanFranciscoTime(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(formatSanFranciscoTime(new Date()));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-line pt-10 pb-12 text-[13px] text-mute">
      <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 text-center md:grid-cols-3 md:text-left">
        <div className="flex justify-center md:justify-start">
          <Link href="/contact" className="font-medium text-ink hover:text-ink/80">
            Reach Out
          </Link>
        </div>

        <div className="flex justify-center text-ink font-medium">
          Made by Shehryar <span className="text-soft mx-2">|</span> 2026
        </div>

        <div className="flex items-center justify-center gap-2 md:justify-end">
          <Clock size={18} className="text-ink/80" />
          <span className="text-ink">{time}</span>
        </div>
      </div>
    </footer>
  );
}
