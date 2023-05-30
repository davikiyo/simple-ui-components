import { keyframes } from '@stitches/react'

export const slideBottomUp = keyframes({
  '0%': {
    top: '100%',
    left: '50%',
  },
  '100%': {
    top: '50%',
    left: '50%',
    animationTimingFunction: 'cubic-bezier(.1,1,.8,1)',
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
