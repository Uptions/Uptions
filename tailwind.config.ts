import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "text-gradient":
          "linear-gradient(133.75deg, rgba(0, 123, 255, 0.5) 25%, rgba(0, 123, 255, 0.75) 75%, rgba(0, 123, 255, 1) 100%)",
      },
      keyframes: {
        bike1: {
          "0%": { transform: "translateX(200%) rotate(12deg)" },
          "100%": { transform: "translateX(-10%) translateY(-50%) rotate(0)" },
        },
        bike2: {
          "0%": {
            transform: "translateX(-200%) translateY(200%) rotate(-12deg)",
          },
          "100%": { transform: "translateX(40%) translateY(-85%) rotate(0)" },
        },
        bike3: {
          "0%": { transform: "translateX(-200%) rotate(6deg)" },
          "100%": { transform: "translateX(25%) translateY(-40%) rotate(0)" },
        },
        bike4: {
          "0%": {
            transform: "translateX(-200%) translateY(200%) rotate(-12deg)",
          },
          "100%": { transform: "translateX(-5%) translateY(-35%) rotate(0)" },
        },
        bike4medium: {
          "0%": {
            transform: "translateX(-200%) translateY(200%) rotate(-12deg)",
          },
          "100%": { transform: "translateX(20%) translateY(-25%) rotate(0)" },
        },

      },
      animation: {
        bike1: "bike1 3s ease-out forwards",
        bike3: "bike3 3s ease-out forwards",
        bike2: "bike2 3s ease-out forwards",
        bike4: "bike4 3s ease-out forwards",
        bike4medium: "bike4medium 3s ease-out forwards",
      },
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
