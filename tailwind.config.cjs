/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        events: '#FF6633',
      },
    },
  },
  plugins: [],
};

module.exports = config;
