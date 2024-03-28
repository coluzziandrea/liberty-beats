/** @type {import('tailwindcss').Config} */
const colorNames = ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
const safelist = colorNames
  .map((color) => [
    `bg-${color}-200`,
    `bg-${color}-400`,
    `bg-${color}-500`,
    `text-${color}-400`,
    `text-${color}-500`,
    `accent-${color}-600`,
    `bg-${color}-600`,
    `peer-checked:bg-${color}-600`,
    `peer-focus:ring-${color}-800`,
    `bg-${color}-700`,
    `ring-${color}-800`,
    `bg-${color}-800`,
    `bg-${color}-900`,
  ])
  .flat()

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: safelist,
}
