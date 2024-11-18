/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#dbc66e',
        'on-primary': '#3a3000',
        'primary-container': '#534600',
        'on-primary-container': '#f8e287',
        'secondary': '#d1c6a1',
        'on-secondary': '#363016',
        'secondary-container': '#4e472a',
        'on-secondary-container': '#eee2bc',
        'tertiary': '#a9d0b3',
        'on-tertiary': '#143723',
        'tertiary-container': '#2c4e38',
        'on-tertiary-container': '#c5ecce',
        'surface': '#15130b',
        'on-surface': '#e8e2d4',
        'on-surface-variant': '#cdc6b4',
        'surface-bright': '#3c3930'
      }
    }
  },
  plugins: []
};
