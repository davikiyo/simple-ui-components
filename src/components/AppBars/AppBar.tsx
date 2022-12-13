import { ReactNode } from 'react'
import { styled, CSS } from 'styles'

const StyledAppBar = styled('div', {
  height: '60px',
  fontFamily: '$main',
  backgroundColor: '$indigo',
  color: '#fff',
  boxSizing: 'border-box',
  padding: '$2 $3',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1000,
  variants: {
    small: {
      true: {
        height: '50px',
      },
    },
    sticky: {
      true: {
        position: 'sticky',
        top: 0,
        left: 0,
      },
    },
  },
})

interface AppBarProps {
  /**
   * Defines a class for the app bar.
   */
  className?: string

  /**
   * Overrides the style.
   */
  css?: CSS

  /**
   * Contents to be displayed in the AppBar.
   */
  children?: ReactNode

  /**
   * Displays a small AppBar.
   */
  small?: boolean

  /**
   * Displays a sticky header
   */
  sticky?: boolean
}

/**
 * displays an AppBar component.
 */
export default function AppBar({
  className,
  css,
  children,
  small = false,
  sticky = false,
}: AppBarProps) {
  return (
    <StyledAppBar className={className} css={css} role="toolbar" small={small} sticky={sticky}>
      {children}
    </StyledAppBar>
  )
}
