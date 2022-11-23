import { keyframes } from '@stitches/react'

export const slideBottomUp = keyframes({
  '0%': {
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, 400px)',
    animationTimingFunction: 'ease-in',
  },
  '50%': {
    top: '75%',
    left: '50%',
    transform: 'translate(-50%, -25%)',
    animationTimingFunction: 'ease-out',
  },
  '80%': {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -55%)',
    animationTimingFunction: 'ease-in',
  },
  '100%': {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animationTimingFunction: 'ease-in',
  },
})

export const slideLeftRight = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
    animationTimingFunction: 'ease-out',
  },
  '100%': {
    transform: 'translateX(0%)',
    animationTimingFunction: 'ease-in',
  },
})

export const slideRightLeft = keyframes({
  '0%': {
    transform: 'translateX(0%)',
    animationTimingFunction: 'ease-out',
  },
  '100%': {
    transform: 'translateX(-100%)',
    animationTimingFunction: 'ease-in',
  },
})

export const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})
