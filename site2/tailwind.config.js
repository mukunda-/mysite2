/** @type {import('tailwindcss').Config} */
export default {
  content: ["./plates/*.templ"],
  theme: {
    extend: {
      screens: {
        bp1: '900px',
      },
    },
  },
  plugins: [],
};
