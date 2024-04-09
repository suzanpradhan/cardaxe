/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        110: '28rem',
        120: '32rem',
        125: '34rem',
        130: '36rem',

        140: '40rem',
      },
      width: {
        110: '28rem',
        120: '32rem',
        130: '36rem',
        140: '40rem',
        160: '50rem',
      },
      minHeight: {
        fitall: '40rem',
      },
      flexBasis: {
        110: '28rem',
        120: '32rem',
        130: '36rem',
        140: '40rem',
        160: '50rem',
      },
      boxShadow: {
        '3xl': '0px 10px 20px 10px rgba(0, 0, 0, .2)',
        upper: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
      },
      colors: {
        redError: '#dd373a',
        blueBg: '#bfdbfe',
        blueTheme: '#2563eb',
        grayfont: '#7e858f',
        banner: '#878c90',
        inputBgGrey: '#f7f7f7',
        inputPlaceholder: '#7e858f',
        borderMain: '#d1d5db',
        componentBgGrey: '#e6e6e6',
        inputDisabled: '#e6e6e6',
      },
      borderWidth: {
        1: '1px',
      },
      gridTemplateColumns: {
        'dashboard-layout-fullscreen': 'minmax(175px, 1fr) minmax(300px, 5fr)',
        'home-layout': 'minmax(200px, 55%) minmax(0px, 45%)',
        'table-grid': '35% 10% 20% 15% 20%',
      },
      maxHeight: {
        120: '36rem',
      },
      fontSize: {
        'xs-mobile': ['10px', '15px'],
        'sm-mobile': ['12px', '17px'],
        'base-mobile': ['14px', '20px'],
        'lg-mobile': ['18px', '24px'],
        'xl-mobile': ['22px', '30px'],
        '2xl-mobile': ['26px', '34px'],
        '3xl-mobile': ['30px', '38px'],
        '4xl-mobile': ['34px', '42px'],
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
};
