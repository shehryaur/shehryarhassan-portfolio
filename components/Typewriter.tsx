"use client";

import { useEffect, useState } from "react";

/**
 * Auto-cycling typewriter. Types a word out, holds, deletes, moves to next.
 *
 * Props:
 *  - words:       array of strings to cycle through
 *  - typingMs:    ms per character while typing
 *  - deletingMs:  ms per character while deleting
 *  - holdMs:      ms to hold a fully typed word before deleting
 *  - className:   passed through to the wrapper span
 */
export default function Typewriter({
  words,
  typingMs = 90,
  deletingMs = 45,
  holdMs = 1400,
  className = "",
}: {
  words: string[];
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIdx % words.length];

    // Word just finished typing — hold, then start deleting.
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }

    // Word fully deleted — advance to the next.
    if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deletingMs : typingMs
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words, typingMs, deletingMs, holdMs]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="tw-caret" aria-hidden="true" />
    </span>
  );
}
