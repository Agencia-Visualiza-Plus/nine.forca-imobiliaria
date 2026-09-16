import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14161A",
          900: "#14161A",
          800: "#1E2127",
          700: "#2B2F37",
          600: "#3C4149",
          500: "#5A6069",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          soft: "#F8F7F4",
          muted: "#EFEDE8",
          line: "#E4E1DA",
        },
        brand: {
          DEFAULT: "#F26A21",
          50: "#FFF4EC",
          100: "#FFE4D3",
          200: "#FFC9A8",
          300: "#FBA771",
          400: "#F58740",
          500: "#F26A21",
          600: "#DC5410",
          700: "#B8410C",
          800: "#8F320A",
          900: "#611F04",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 22, 26, 0.04), 0 8px 24px -12px rgba(20, 22, 26, 0.18)",
        lift: "0 2px 4px rgba(20, 22, 26, 0.06), 0 18px 40px -18px rgba(20, 22, 26, 0.28)",
        search: "0 18px 50px -22px rgba(20, 22, 26, 0.45)",
      },
      maxWidth: {
        shell: "1240px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
