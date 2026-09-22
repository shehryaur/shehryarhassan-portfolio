"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AvatarVisionModel from "@/components/AvatarVisionModel";
import HighlightsStory from "@/components/HighlightsStory";

interface WordItem {
  label: string;
  color: string;
}

function WordRotate({
  items,
  duration,
  className,
}: {
  items: WordItem[];
  duration: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, items.length]);

  const item = items[index];

  return (
    <span className={className}>
      <span className={item.color}>{item.label}</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="md:flex md:items-start md:justify-between md:gap-10">
        <div className="md:max-w-2xl">
          <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight text-ink md:text-[56px]">
            Hey, I&apos;m Shehryar
          </h1>
          {/* Bio block */}
          <div className="mt-8 space-y-4 text-[15px] leading-[1.8] text-ink/90">
            <p>I build AI products, data systems, and finance-aware automation.</p>
            <p>
              I&apos;m an undergraduate at Minerva University studying Data &amp; AI with Strategic Finance.
              My work sits at the intersection of product strategy, machine learning, business models, and capital-efficient growth.
            </p>
          </div>

          <div className="mt-7 text-[14px] font-medium text-ink/70">
            Minerva rotation:{' '}
            <span className="text-black">(</span>
            <WordRotate
              items={[
                { label: 'San Francisco', color: 'text-sky-500' },
                { label: 'Tokyo', color: 'text-fuchsia-500' },
                { label: 'Berlin', color: 'text-emerald-500' },
                { label: 'Buenos Aires', color: 'text-amber-500' },
              ]}
              duration={2500}
              className="text-black"
            />
            <span className="text-black">)</span>
          </div>

          <div className="mt-8 text-[16px] font-medium text-ink">
            Got a project?{' '}
            <Link href="/contact" className="ulink">
              Let&apos;s talk
            </Link>
          </div>
        </div>

        <div className="mt-10 flex-shrink-0 md:mt-0 md:ml-32 lg:ml-40 xl:ml-48">
          <div className="flex flex-col items-center gap-6">
            <AvatarVisionModel />
            <HighlightsStory />
          </div>
        </div>
      </section>
    </div>
  );
}
