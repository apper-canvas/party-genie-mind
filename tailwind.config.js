/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#FF6B35', // Saffron Orange
        secondary: '#50C878', // Emerald Green
        accent: '#FFB347', // Marigold Yellow
        royal: '#4169E1', // Royal Blue
        crimson: '#DC143C', // Traditional Red
        surface: {
          50: '#fef7f0',
          100: '#fef2e8',
          200: '#fce7d6',
          300: '#f9d5b8',
          400: '#f5b885',
          500: '#f19654',
          600: '#ed7c3c',
          700: '#e85d1c',
          800: '#c44d18',
          900: '#a03f16'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        heading: ['Playfair Display', 'ui-serif', 'serif'],
        display: ['Cinzel', 'ui-serif', 'serif']
      }
    },
  },
  plugins: [],
}