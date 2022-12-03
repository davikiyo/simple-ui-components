import { ReactNode } from 'react'
import cx from 'classnames'

import { CSS, styled } from 'styles'

const StyledButton = styled('button', {
  height: '3.125rem',
  border: 'none',
  padding: '$2 $3',
  width: '100%',
  textAlign: 'left',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '$md',
  '&:hover': {
    backgroundColor: '$lightGray',
  },
  '&:disabled, &:active, &.active': {
    color: '#000',
    backgroundColor: '$lightGraySecondary',
  },
  variants: {
    small: {
      true: {
        height: '2.75rem',
      },
    },
  },
})

export interface MenuButtonProps {
  /**
   * Sets the button to active. (disabled)
   */
  active?: boolean

  /**
   * Defines a class for the menu button.
   */
  className?: string

  /**
   * Overrides the menu button style.
   */
  css?: CSS

  /**
   * Contents to be displayed in the menu button.
   */
  children?: ReactNode

  /**
   * Disables the menu button.
   */
  disabled?: boolean

  /**
   * Displays a small menu button.
   */
  small?: boolean

  /**
   * Handles the click event.
   */
  onClick?: () => void
}

/**
 * displays a styled menu button.
 */
export default function MenuButton({
  active = false,
  className,
  children,
  css,
  disabled = false,
  small = false,
  onClick,
}: MenuButtonProps) {
  const buttonClasses = cx(className, { active })

  return (
    <StyledButton
      className={buttonClasses}
      css={css}
      disabled={active || disabled}
      small={small}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}
