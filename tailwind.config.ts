import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        monis: {
          mint: "#a8f0cf",
          green: "#24c27a",
          blue: "#2f6df6",
          line: "#d9dedb",
          paper: "#f7f8f6"
        }
      },
      boxShadow: {
        soft: "0 16px 50px rgba(23, 23, 23, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
