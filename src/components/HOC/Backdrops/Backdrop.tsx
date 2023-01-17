import { ComponentType, useEffect } from 'react'
import { styled } from 'styles'
import FocusTrap from './FocusTrap'

const StyledBackdrop = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
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
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('touch-action')
    document.body.style.removeProperty('width')
    document.body.style.removeProperty('height')
  }

  const WrappedComponent = ({ onClose, show = false, ...props }: T) => {
    // Set overflow property
    useEffect(() => {
      if (fixContent && show) {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
        document.body.style.width = '100vw'
        document.body.style.height = '100%'
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
          aria-hidden={!show}
        />
        <FocusTrap>
          <Component {...(props as T)} show={show} />
        </FocusTrap>
      </>
    )
  }

  const displayName = Component.displayName || Component.name || 'Component'
  WrappedComponent.displayName = `withBackDrop(${displayName})`

  return WrappedComponent
}
