"use client";
import React, { useState, useEffect } from "react";
import { site } from "@/lib/data";

export default function AvatarVisionModel({ className = "h-72 w-72" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [confidence, setConfidence] = useState(0.14);

  useEffect(() => {
    let interval: number | undefined;
    if (isHovered) {
      setConfidence(0.14);
      interval = window.setInterval(() => {
        setConfidence((prev) => {
          if (prev >= 0.99) {
            if (interval) window.clearInterval(interval);
            return 0.99;
          }
          const jump = Math.random() * 0.05 + 0.03;
          return parseFloat(Math.min(prev + jump, 0.89).toFixed(2));
        });
      }, 90);
    } else {
      setConfidence(0.14);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <div
      className={`relative ${className} cursor-crosshair group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image wrapper: keep the circular crop and shadow here so overlays aren't clipped */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-full border-8 border-white bg-subtle shadow-[0_20px_80px_rgba(15,23,42,0.12)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={site.avatar}
          alt={site.fullName}
          className="w-full h-full object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Bounding box overlay (above image) */}
      <div
        className={`absolute inset-4 z-10 border-2 rounded-full transition-all duration-300 pointer-events-none ${
          isHovered ? "border-emerald-400 opacity-100 scale-100" : "border-transparent opacity-0 scale-105"
        }`}
      >
        <div
          className={`absolute -top-3 -left-0.5 bg-emerald-400 text-black font-mono text-[10px] font-bold px-1.5 py-0.5 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {`OBJ: FDE`}
        </div>

        <div
          className={`absolute -bottom-4 right-0.5 bg-black text-emerald-400 font-mono text-[10px] font-bold px-1.5 py-0.5 border border-emerald-400 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {`CONF: ${confidence.toFixed(2)}`}
        </div>

        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-400 bg-transparent"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-400 bg-transparent"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-400 bg-transparent"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-400 bg-transparent"></div>
      </div>

      {isHovered && (
        <div className="absolute left-0 w-full h-[1px] bg-emerald-400/50 shadow-[0_0_8px_2px_rgba(52,211,153,0.5)] animate-scan pointer-events-none"></div>
      )}
    </div>
  );
}
