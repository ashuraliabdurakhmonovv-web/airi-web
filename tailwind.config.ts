import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-google-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: [
          "var(--font-science-gothic)",
          "var(--font-google-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        accent: [
          "var(--font-science-gothic)",
          "var(--font-google-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-science-gothic)",
          "var(--font-google-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "airi-xs": ["12px", { lineHeight: "1.4" }],
        "airi-sm": ["14px", { lineHeight: "1.6" }],
        "airi-base": ["16px", { lineHeight: "1.75" }],
        "airi-lg": ["18px", { lineHeight: "1.85" }],
        "airi-xl": ["20px", { lineHeight: "1.5" }],
        "airi-2xl": ["24px", { lineHeight: "1.25" }],
        "airi-3xl": ["30px", { lineHeight: "1.15" }],
        "airi-4xl": ["36px", { lineHeight: "1.08" }],
        "airi-5xl": ["48px", { lineHeight: "1" }],
        "airi-6xl": ["60px", { lineHeight: "0.95" }],
        "airi-7xl": ["72px", { lineHeight: "0.95" }],
      },
      maxWidth: {
        "7xl": "90rem",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
  ],
}

export default config
