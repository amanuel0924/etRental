/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "custom-violete": "#8055D8",
      },

      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
}
