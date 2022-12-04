import { ComponentType, useEffect } from 'react'
import { styled } from 'styles'

const StyledBackdrop = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999,
  width: '100vw',
  height: '100vh',
  transitionProperty: 'opacity, visibility',
  transitionDuration: '.3s',
  transitionTimingFunction: 'linear',
  opacity: 0,
  visibility: 'hidden',

  variants: {
    color: {
      dark: {
        backgroundColor: 'rgba(0,0,0,0.6)',
      },
      light: {
        backgroundColor: 'rgba(255,255,255,0.6)',
      },
    },
    show: {
      true: {
        visibility: 'visible',
        opacity: 1,
      },
    },
  },
})

export interface BackdropProps {
  /**
   * Displays if true.
   */
  show?: boolean

  /**
   * Handles the close event.
   */
  onClose?: () => void
}

interface BackdropOptions {
  /**
   * Displays a backdrop in the specified color.
   */
  color?: 'dark' | 'light'

  /**
   * Fix the content in the background when true.
   */
  fixContent?: boolean
}

/**
 * displays a backdrop along with a passed component. (HOC)
 */
export default function withBackDrop<T extends BackdropProps = BackdropProps>(
  Component: ComponentType<T>,
  { color = 'dark', fixContent = false }: BackdropOptions = {}
) {
  const resetProperties = () => {
    document.body.style.removeProperty('overflow-y')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('width')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('left')
  }

  const WrappedComponent = ({ onClose, show = false, ...props }: T) => {
    // Set overflow property

    useEffect(() => {
      if (fixContent && show) {
        document.body.style.overflowY = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100vw'
        document.body.style.top = '0'
        document.body.style.left = '0'
      } else {
        resetProperties()
      }

      return () => {
        resetProperties()
      }
    }, [show])

    return (
      <>
        <StyledBackdrop
          data-testid={`backdrop-${color}`}
          color={color}
          show={show}
          onClick={onClose}
        />
        <Component {...(props as T)} show={show} />
      </>
    )
  }

  const displayName = Component.displayName || Component.name || 'Component'
  WrappedComponent.displayName = `withBackDrop(${displayName})`

  return WrappedComponent
}
