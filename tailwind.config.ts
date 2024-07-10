import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "blue-10": "#3088D8",
      "blue-20": "#077BCD",
      "blue-30": "#005AA2",
      "blue-40": "#004D98",
      "blue-50": "#0D0379",
      white: "#fff",
    },
  },
  plugins: [],
};
export default config;
