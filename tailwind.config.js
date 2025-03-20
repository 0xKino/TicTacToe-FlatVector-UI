/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#dddddd',
        accent: '#9d85ff',
        background: '#000000',
        'x-color': '#ffffff',
        'o-color': '#9d85ff'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 5px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)',
        'cell': '0 0 1px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
 