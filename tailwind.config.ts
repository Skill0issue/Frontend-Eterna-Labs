import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          "1": "var(--text-1)",
          "2": "var(--text-2)",
          "3": "var(--text-3)",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          hover: "var(--bg-hover)",
          blue: {
            DEFAULT: "var(--blue)",
            bg: "var(--blue-bg)",
          },
          purple:{
            DEFAULT:"var(--purple)",
          },
          green: {
            "2": "var(--green-2)",
            DEFAULT: "var(--green)",
          },
          red: {
            "2": "var(--red-2)",
            DEFAULT: "var(--red)",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          cyan: "var(--cyan)",
          orange: "var(--orange)",
          primaryBlue: "rgb(var(--primary-blue) / <alpha-value>)",
          background: "hsl(var(--background))",
        },
        borderRadius: {
          sm: "calc(var(--radius) - 4px)",
          md: "calc(var(--radius) - 2px)",
          lg: "var(--radius)",
          full: "var(--radius-full)",
        },
        fontFamily: {
          inter: 'var(--font-inter), sans-serif',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
