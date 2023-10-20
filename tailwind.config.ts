import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: {
          text: "#1F2937",
          text2: "#374151",
          textBooks: "#1F2937",
          textBooks2: "#4b5563",
          back: "#ffffff",
          hover: "#030712",
          border: "#d1d5db",
          sectionHome: "#e5e7eb",
          sectionHomeText: "#1F2937",
          footerBg: "#e5e7eb",
          searchBg: "#ffffff",
          searchText: "#89909b",
        },
        dark: {
          text: "#f1f5f9",
          text2: "#e2e8f0",
          textBooks: "#f1f5f9",
          textBooks2: "#9ca3af",
          back: "#1F2937",
          hover: "#ffffff",
          border: "#4b5563",
          sectionHome: "#4b5563",
          sectionHomeText: "#f1f5f9",
          footerBg: "#4b5563",
          searchBg: "#1e293b",
          searchText: "#89909b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
