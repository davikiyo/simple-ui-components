import { createStitches } from '@stitches/react'

export { default as globalStyles } from './globalStyles'

export const ROOT_FONT_SIZE = 16

export * from '@stitches/react'

export const { styled, css } = createStitches({
  theme: {
    fontSizes: {
      xs: `${10 / ROOT_FONT_SIZE}rem`,
      sm: `${14 / ROOT_FONT_SIZE}rem`,
      md: `${16 / ROOT_FONT_SIZE}rem`,
      lg: `${20 / ROOT_FONT_SIZE}rem`,
      xl: `${24 / ROOT_FONT_SIZE}rem`,
    },
    colors: {
      lightGray: '#f0f0f0',
      darkGray: '#707070',
      indigo: '#3f51b5',
      red: '#f44336',
      green: '#4caf50',
      purple: '#9c27b0',
    },
    fonts: {
      main: 'Arial, Helvetica, sans-serif',
    },
    space: {
      0: 0,
      1: `${4 / ROOT_FONT_SIZE}rem`,
      2: `${8 / ROOT_FONT_SIZE}rem`,
      3: `${16 / ROOT_FONT_SIZE}rem`,
      4: `${32 / ROOT_FONT_SIZE}rem`,
      5: `${40 / ROOT_FONT_SIZE}rem`,
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
})
