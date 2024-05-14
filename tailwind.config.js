const { fontSize } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontSize: {
      ...fontSize,
      'table-header': '0.65rem',
    },
    extend: {
      height: {
        '30vh': '30vh',
        '40vh': '40vh',
        '70vh': '70vh',
        '80vh': '80vh',
      },
      colors: {
        address: {
          'do-not-go': '#FC1D26',
          'go-back': '#A52EFB',
          'option-1': '#29BAFC',
          'option-2': '#FED837',
          'sold': '#00D939',
        },
        aloe: '#EBF7E8',
        aptiveblue: {
          light: '#6FA1EC',
          DEFAULT: '#2F73DA',
        },
        aptivegreen: {
          lightest: '#E2FCD2',
          lighter: '#D1D6D0',
          light: '#BBD1AE',
          DEFAULT: '#77856e',
          dark: '#626E5B',
          darkest: '#545E4E',
        },
        aptivered: {
          lightest: '#FEE2E2',
          DEFAULT: '#DC2626',
        },
        aptivegray: {
          light: '#d1d5db !important',
          DEFAULT: '#E9EEF2',
        },
        background: {
          chestnut: '#F9F7F4',
          lily: '#F4F9F2',
          mist: '#F2F7F7',
        },
        cloud: '#F5F7ED',
        fern: '#78856E',
        highlight: {
          grass: '#309C42',
          sun: '#E1FF32',
        },
        locationmarker: {
          '#FFFFFF': '#CCCCCC',
          '#DC2626': '#DC2626',
          '#9E6EE6': '#9E6EE6',
          '#72A1E8': '#72A1E8',
          '#82D5EB': '#82D5EB',
          '#72E361': '#72E361',
          '#E4AC71': '#E4AC71',
          '#B7306E': '#B7306E',
          '#1F498C': '#1F498C',
          '#622ABF': '#622ABF',
          '#FDE047': '#FDE047',
        },
        pine: '#344C38',
        polygon: {
          assigned: '#4DA7C3',
          disabled: '#A0A0A0',
          unassigned: '#B7306E',
        },
        primary: {
          100: '#CFE1AD',
          200: '#A5B78C',
          300: '#7B8D6B',
          400: '#50624A',
          500: '#263829',
        },
        disabled: '#CBD5E1',
        sage: '#B5C5B2',
        secondary: {
          bark: '#8A7357',
          sand: '#BDB2A0',
          sky: '#EAF4F4',
          space: '#1E2D3A',
          stone: '#B8CCC9',
        },
        'snow-white': '#FFFFFF',
        team: {
          1: '#267ADC',
          2: '#9E6EE6',
          3: '#72A1E8',
          4: '#1DB2DA',
          5: '#B2E361',
          6: '#E4AC71',
          7: '#B7306E',
          8: '#1F498C',
          9: '#622ABF',
          10: '#FDE047',
        },
      },
      zIndex: {
        '1000': '1000',
        '1010': '1010',
      },
      boxShadow: {
        'popup': '0px 12px 20px rgba(106,115,129,0.22)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    require('@tailwindcss/forms')
  ],
};
