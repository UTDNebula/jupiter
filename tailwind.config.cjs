/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: '#3361FF',
        },
      },
      backgroundColor: {
        events: '#FF6633',
      },
      spacing: {
        1.25: '.3125rem',
        7.5: '1.875rem',
      },
    },
  },
  plugins: [],
};

module.exports = config;
