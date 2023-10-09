import { createTheme, rem } from '@mantine/core';

// Simply taken from: https://mantine.dev/theming/theme-object/#usage
const theme = createTheme({
    colors: {
        deepBlue: [
          '#E9EDFC', '#D8E2F5', '#C1CCF6', '#AAB6EF', '#99ABF0', 
          '#7889DB', '#6773C5', '#565EAF', '#454A99' 
        ],
        blue: [
          '#E9EDFC', '#D8E2F5', '#C1CCF6', '#AAB6EF', '#99ABF0', 
          '#7889DB', '#6773C5', '#565EAF', '#454A99'
        ],
      },
      
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

export default theme