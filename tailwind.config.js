/** @type {import('tailwindcss').Config} */
const colorNames = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'cyan',
  'pink',
]
const safelist = colorNames
  .map((color) => [
    `bg-${color}-50`,
    `bg-${color}-100`,
    `bg-${color}-200`,
    `bg-${color}-300`,
    `bg-${color}-400`,
    `bg-${color}-500`,
    `bg-${color}-600`,
    `bg-${color}-700`,
    `bg-${color}-800`,
    `bg-${color}-900`,

    `hover:bg-${color}-100`,
    `hover:bg-${color}-600`,

    `group-hover:bg-${color}-500`,

    `dark:bg-${color}-100`,
    `dark:bg-${color}-200`,
    `dark:bg-${color}-500`,
    `dark:bg-${color}-700`,
    `dark:bg-${color}-800`,
    `dark:bg-${color}-900`,

    `dark:hover:bg-${color}-900`,

    `peer-checked:bg-${color}-600`,

    `border-${color}-300`,

    `dark:border-${color}-800`,

    `text-${color}-200`,
    `text-${color}-400`,
    `text-${color}-500`,
    `text-${color}-800`,

    `dark:text-${color}-400`,
    `dark:text-${color}-800`,

    `accent-${color}-600`,

    `ring-${color}-800`,

    `peer-focus:ring-${color}-800`,
  ])
  .flat()

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animate')],
  safelist: safelist,
}
