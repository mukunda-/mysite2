/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      screens: {
        bp1: '900px',
      },
    },
  },
  plugins: [],
};
