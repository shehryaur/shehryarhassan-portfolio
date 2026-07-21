import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#f5f5f4",     // page bg (warm off-white)
        surface: "#ffffff",  // cards
        subtle: "#eeedec",   // sidebar bg / hover
        line: "#e5e4e2",     // borders
        ink: "#0a0a0a",      // primary text / active pill
        mute: "#6b7280",     // secondary text
        soft: "#9ca3af",     // tertiary text
        success: "#16a34a",
        beam: "#0a0a0a",     // timeline scroll beam (now minimalist)
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        display: ["56px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      keyframes: {
        "ambient-drift": {
          "0%":   { transform: "translate(-10%, -10%) scale(1)" },
          "50%":  { transform: "translate(10%, 5%) scale(1.15)" },
          "100%": { transform: "translate(-10%, -10%) scale(1)" },
        },
        "ambient-drift-2": {
          "0%":   { transform: "translate(15%, 20%) scale(1.1)" },
          "50%":  { transform: "translate(-5%, -10%) scale(1)" },
          "100%": { transform: "translate(15%, 20%) scale(1.1)" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
      },
      animation: {
        "ambient-drift":   "ambient-drift 22s ease-in-out infinite",
        "ambient-drift-2": "ambient-drift-2 28s ease-in-out infinite",
        scan: "scan 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
