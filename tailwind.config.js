/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors:{
        background:'rgb(var(--color-background))',
        foreground:'rgb(var(--color-foreground))',
        border:'rgb(var(--color-border))',
        primary:'rgb(var(--color-primary) / <alpha-value>)',
        primaryLight:'rgb(var(--color-primaryLight) / <alpha-value>)',
        primaryDark:'rgb(var(--color-primaryDark) / <alpha-value>)',
        primaryContent:'rgb(var(--color-primaryContent) / <alpha-value>)',
        secondary:'rgb(var(--color-secondary) / <alpha-value>)',
        secondaryLight:'rgb(var(--color-secondaryLight) / <alpha-value>)',
        secondaryDark:'rgb(var(--color-secondaryDark) / <alpha-value>)',
        secondaryContent:'rgb(var(--color-secondaryContent) / <alpha-value>)',
        success:'rgb(var(--color-success) / <alpha-value>)',
        successContent:'rgb(var(--color-successContent) / <alpha-value>)',
        warning:'rgb(var(--color-warning) / <alpha-value>)',
        warningContent:'rgb(var(--color-warningContent) / <alpha-value>)',
        error:'rgb(var(--color-error) / <alpha-value>)',
        errorContent:'rgb(var(--color-errorContent) / <alpha-value>)',
        copy:'rgb(var(--color-copy) / <alpha-value>)',
        copyLight:'rgb(var(--color-copyLight) / <alpha-value>)',
        copyLighter:'rgb(var(--color-copyLighter) / <alpha-value>)',
      },
      fontFamily:{
        main:'var(--font-main)'
      }
    },
  },
  plugins: [],
};
