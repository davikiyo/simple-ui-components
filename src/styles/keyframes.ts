import { keyframes } from '@stitches/react'

export const slideBottomUp = keyframes({
  '0%': {
    top: '100%',
    left: '50%',
    animationTimingFunction: 'ease-in',
  },
  '50%': {
    top: '80%',
    left: '50%',
    animationTimingFunction: 'linear',
  },
  '80%': {
    top: '45%',
    left: '50%',
    animationTimingFunction: 'ease-out',
  },
  '100%': {
    top: '50%',
    left: '50%',
    animationTimingFunction: 'ease-in',
  },
})

export const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})
