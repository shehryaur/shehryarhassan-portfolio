/**
 * Minimal `cn` helper — merges class names without pulling in clsx/tailwind-merge
 * (keeps the dependency graph tiny and matches the shadcn API surface).
 */
export function cn(
  ...inputs: Array<string | number | null | false | undefined | Record<string, boolean>>
): string {
  const out: string[] = [];
  for (const val of inputs) {
    if (!val) continue;
    if (typeof val === "string" || typeof val === "number") {
      out.push(String(val));
    } else if (typeof val === "object") {
      for (const [k, v] of Object.entries(val)) {
        if (v) out.push(k);
      }
    }
  }
  return out.join(" ");
}
