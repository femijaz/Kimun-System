/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#23661d",
        "primary-container": "#3d8034",
        "secondary": "#036e00",
        "secondary-container": "#92fb7b",
        "tertiary": "#874a13",
        "background": "#fff8f5",
        "surface": "#fff8f5",
        "surface-container": "#ffeada",
        "surface-container-low": "#fff1e7",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#ffe3cc",
        "surface-container-highest": "#ffdcbe",
        "surface-variant": "#ffdcbe",
        "on-background": "#2d1600",
        "on-surface": "#2d1600",
        "on-surface-variant": "#41493d",
        "on-primary": "#ffffff",
        "branch-manada": "#ffde59",
        "branch-unidad": "#7ed957",
        "branch-caminante": "#0cc0df",
        "branch-rover": "#ff3131",
        "branch-adult": "#8c52ff",
      },
      fontFamily: {
        sans: ['"Work Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}