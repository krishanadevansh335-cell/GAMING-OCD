/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gcc: {
          charcoal: "#111413",
          "deep-charcoal": "#1C2420",
          "dark-forest": "#10291D",
          forest: "#145A36",
          emerald: "#20A66A",
          crimson: "#DC2638",
          "deep-crimson": "#941C2C",
          white: "#E9EFEB",
          muted: "#A2ADA6",
          border: "#303A33",
          disabled: "#626B65",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "'Segoe UI'", "sans-serif"],
        sans: ["'Inter'", "'Segoe UI'", "sans-serif"],
        mono: ["'JetBrains Mono'", "Consolas", "monospace"],
      },
      borderRadius: {
        card: "14px",
        modal: "16px",
        hero: "20px",
      },
      transitionTimingFunction: {
        gcc: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
