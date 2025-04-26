/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "3xs": "320px",
        "2xs": "375px",
        xs: "425px",
        s: "768px",
        md: "1024px",
        lg: "1440px",
        xl: "2560px",
      },
    },
  },
  plugins: [],
};
