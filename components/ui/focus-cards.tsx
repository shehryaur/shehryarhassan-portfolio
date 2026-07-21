"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A single focus card. Non-hovered siblings blur + shrink so the hovered card
 * "focuses". Adapted from the aceternity focus-cards pattern.
 */
export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: FocusCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const inner = (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out border border-line",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        <Image
          src={card.src}
          alt={card.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover absolute inset-0"
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/55 flex flex-col justify-end py-6 px-5 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title}
          </div>
          {card.subtitle && (
            <p className="mt-1 text-[13px] text-neutral-200/85 line-clamp-2">
              {card.subtitle}
            </p>
          )}
        </div>
      </div>
    );

    return card.href ? (
      <Link href={card.href} className="block cursor-pointer">
        {inner}
      </Link>
    ) : (
      inner
    );
  }
);

Card.displayName = "Card";

export type FocusCard = {
  title: string;
  src: string;
  subtitle?: string;
  href?: string;
};

export function FocusCards({ cards }: { cards: FocusCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
