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
        // Premium Monochromatic & Platinum Greys
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
        glass: "0 20px 50px rgba(0, 0, 0, 0.6)",
        "glass-subtle": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 0 30px rgba(255, 255, 255, 0.08)",
        "white-glow": "0 0 25px rgba(255, 255, 255, 0.18)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.25s ease-out forwards",
      }
    },
  },
  plugins: [],
};

export default config;
