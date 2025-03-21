import type { Config } from "tailwindcss";

const config: Config = {
    content: [

         "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
         "./app/pages/*.{js,ts,jsx,tsx,mdx}",
         "./app/projects/**/*.{js,ts,jsx,tsx,mdx}", 
         "./app/projects/*.{js,ts,jsx,tsx,mdx}",
         "./app/about/*.{js,ts,jsx,tsx,mdx}",
         "./app/components/*.{js,ts,jsx,tsx,mdx}",
         
         "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
         "./app/*.{js,ts,jsx,tsx,mdx}",
    ],
       useImportant: true, // Consider removing this if possible
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
                sm: "599px",
                md: "700px",
                lg: "849px",
                xl: "919px",
                "2xl": "1199px",
                "3xl": "1299px",
                "4xl": "1499px",
                "5xl": "1699px",
                "6xl": "1899px",
                "7xl": "2099px",
                "8xl": "2299px",
                "9xl": "2499px",
                "10xl": "2699px",
                "11xl": "2899px",
            },
        },
    },
    plugins: [],
};

export default config;