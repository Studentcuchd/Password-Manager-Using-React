/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#0a0a0f',
          card: '#141419',
          border: '#1f1f26',
          text: '#e4e4e7',
          muted: '#a1a1aa',
        },
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
