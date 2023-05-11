import { createStitches, PropertyValue } from '@stitches/react'

export const ROOT_FONT_SIZE = 16

export const { styled, css, getCssText } = createStitches({
  utils: {
    px: (value: PropertyValue<'padding'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<'padding'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    mx: (value: PropertyValue<'margin'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<'margin'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
  },
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
      lightGraySecondary: '#c0c0c0',
      darkGray: '#707070',
      indigo: '#3f51b5',
      red: '#f44336',
      green: '#4caf50',
      purple: '#9c27b0',
      secondary: '#03a9f4',
      error: '#f44336',
      success: '#3fb556',
      info: '#03a9f4',
      warning: '#ff9300',
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

export * from '@stitches/react'
export * from './keyframes'
