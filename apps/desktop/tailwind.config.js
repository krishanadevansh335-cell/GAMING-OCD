/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gaming: {
          accent: "#00f0ff",
          purple: "#7928ca",
          card: "#12131a",
          border: "#1f2233",
          hover: "#252a3d",
        },
      },
    },
  },
  plugins: [],
};
