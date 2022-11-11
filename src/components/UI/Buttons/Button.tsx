import { styled, CSS } from 'styles'

const StyledButton = styled('button', {
  padding: '$2',
  border: 'none',
  backgroundColor: '$secondary',
  color: '#fff',
  height: '3.125rem',
  cursor: 'pointer',
  fontSize: '$md',
  outline: 'none',
  transition: 'box-shadow .2s linear',
  variants: {
    rounded: {
      true: {
        borderRadius: '20px',
      },
    },
    outlined: {
      true: {
        backgroundColor: '#fff',
        color: '#000',
        border: '1px solid $secondary',
        '&:disabled': {
          border: 'none',
        },
      },
    },
  },
  '&:active': {
    filter: 'brightness(0.8)',
    transition: 'none',
  },
  '@bp3': {
    '&:hover, &:focus': {
      boxShadow: '2px 4px 6px #ccc',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  '&:disabled': {
    backgroundColor: '$lightGraySecondary',
    color: '#000',
    cursor: 'not-allowed',
    boxShadow: 'none',
    filter: 'none',
  },
})

type BUTTON_TYPE = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /**
   * Overrides the button style.
   */
  css?: CSS

  /**
   * Contents to be displayed in the button.
   */
  children?: React.ReactNode

  /**
   * Handles the click event.
   */
  onClick?: () => void

  /**
   * Displays the button in outlined style.
   */
  outlined?: boolean

  /**
   * Displays the button in rounded style.
   */
  rounded?: boolean

  /**
   * Defines the button type.
   */
  type?: BUTTON_TYPE

  /**
   * Disables the button.
   */
  disabled?: boolean
}

/**
 * displays a styled button.
 */
export default function Button({
  css,
  children,
  onClick,
  outlined = false,
  rounded = false,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <StyledButton
      css={css}
      type={type}
      onClick={onClick}
      outlined={outlined}
      rounded={rounded}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}