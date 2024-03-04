/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-red-700',
    'bg-blue-500',
    'bg-blue-700',
    'bg-green-500',
    'bg-green-700',
    'bg-yellow-500',
    'bg-yellow-700',
    'bg-orange-500',
    'bg-orange-700',
    'bg-purple-500',
    'bg-purple-700',
  ],
}
