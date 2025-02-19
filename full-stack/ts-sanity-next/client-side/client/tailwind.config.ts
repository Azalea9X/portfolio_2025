import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/about/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/*.{js,ts,jsx,tsx,mdx}",
  ],
  useImportant: true, 
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Inter", "sans-serif"],
      },
      screens: {
        xxs: "300px",
        xs: "400px",
        sm: "600px",
        md: "700px",
        lg: "900px",
        xl: "1100px",
        "2xl": "1300px",
        "3xl": "1500px",
        "4xl": "1700px",
        "5xl": "1900px",
        "6xl": "2100px",
        "7xl": "2300px",
        "8xl": "2500px",
        "9xl": "2700px",
        "10xl": "2900px",
        "11xl": "3100px",
      },
    },
  },
  plugins: [],
} satisfies Config;