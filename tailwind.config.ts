import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Enterprise Ocean Green Palette
        ocean: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#20c9a6",
          500: "#0e9f84",
          600: "#087f6a",
          700: "#065f50",
          800: "#062f2a",
          900: "#031f1b",
          950: "#021411",
        },
        // Premium Monochromatic & Platinum Greys with Teal Undercurrents
        zinc: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          750: "#333338",
          800: "#27272a",
          850: "#1f1f23",
          900: "#18181b",
          950: "#09090b",
        },
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0, 0, 0, 0.45)",
        "glass-subtle": "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
        "glass-glow": "0 0 30px rgba(32, 201, 166, 0.15)",
        "ocean-glow": "0 0 35px rgba(94, 234, 212, 0.22)",
        "ocean-glow-lg": "0 0 50px rgba(32, 201, 166, 0.3)",
        "ocean-card": "0 20px 60px rgba(0, 0, 0, 0.35), inset 0 1px 0 0 rgba(94, 234, 212, 0.15)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
