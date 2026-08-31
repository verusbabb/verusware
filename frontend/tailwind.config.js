/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [PrimeUI],
  corePlugins: {
    preflight: false,
  },
}
