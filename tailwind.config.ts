import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    flowbite.content(),
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "blue-10": "#3088D8",
        "blue-20": "#077BCD",
        "blue-30": "#005AA2",
        "blue-40": "#004D98",
        "blue-50": "#0D0379",
        "linkedin-blue": "#0a66c2",
        "form-input": "#f5f9ff",
        "form-bg": "#B2EBF2",
        background: "#ffffff",
        foreground: "#090a0d",
        muted: "#f4f4f6",
        "muted-foreground": "#767680",
        popover: "#ffffff",
        "popover-foreground": "#090a0d",
        card: "#ffffff",
        "card-foreground": "#090a0d",
        border: "#e5e5ea",
        input: "#e5e5ea",
        primary: "#1a1a33",
        "primary-foreground": "#fafafa",
        secondary: "#f4f4f6",
        "secondary-foreground": "#1a1a33",
        accent: "#f4f4f5",
        "accent-foreground": "#18181b",
        destructive: "#e3342f",
        "destructive-foreground": "#fafafa",
        ring: "#1a1a33",
        "card-blue": "#0077b533",
        "card-green": "#48ad4333",
        "card-red": "#ff5e5933",
        "card-purple": "#b265ef33",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
} satisfies Config;

export default config;
