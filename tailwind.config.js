/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use 'class' to toggle dark mode manually
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Include DaisyUI for prebuilt components
     // Include the line-clamp plugin
  ],
};
