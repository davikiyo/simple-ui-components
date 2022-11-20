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
  variants: {
    small: {
      true: {
        height: '50px',
      },
    },
  },
})

interface AppBarProps {
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
}

/**
 * displays an AppBar component.
 */
export default function AppBar({ css, children, small = false }: AppBarProps) {
  return (
    <StyledAppBar css={css} role="toolbar" small={small}>
      {children}
    </StyledAppBar>
  )
}
