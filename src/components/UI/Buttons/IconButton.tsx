import { MouseEventHandler } from 'react'
import { styled, CSS } from 'styles'
import { IconName } from 'types/Icon'
import { Icon } from 'components'

const ButtonContainer = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  padding: 0,
  borderRadius: 0,
  color: 'inherit',
  willChange: 'filter',
  backgroundColor: 'transparent',
  transition: 'all .2s ease-in',
  outline: 'none',
  cursor: 'pointer',
  '@bp3': {
    '&:hover, &:focus-visible': {
      filter: 'drop-shadow(2px 2px 1px #707070)',
    },
  },
  '&:active': {
    filter: 'none',
    transition: 'none',
  },
  '&:disabled': {
    filter: 'none',
    cursor: 'default',
  },
  variants: {
    rounded: {
      true: {
        padding: '$2',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        '@bp3': {
          '&:hover, &:focus-visible': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            filter: 'none',
          },
        },
        '&:active': {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        '&:disabled': {
          backgroundColor: 'unset',
          filter: 'none',
        },
      },
    },
  },
})

type BUTTON_TYPE = 'button' | 'submit' | 'reset'

export interface IconButtonProps {
  /**
   * Defines a label for accessibility.
   */
  ariaLabel?: string

  /**
   * Overrides the style.
   */
  css?: CSS

  /**
   * Defines a class for the button.
   */
  className?: string

  /**
   * Defines the icon color.
   */
  color?: string

  /**
   * Disables the button.
   */
  disabled?: boolean

  /**
   * Specifies the height of the button.
   */
  height?: number

  /**
   * Specifies the width of the button.
   */
  width?: number

  /**
   * An icon to be displayed as a button.
   */
  icon: IconName

  /**
   * Handles the click event.
   *
   * @param event - The button event.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>

  /**
   * Displays the button in rounded style.
   */
  rounded?: boolean

  /**
   * Defines the button type.
   */
  type?: BUTTON_TYPE

  /**
   * Specifies the tab index for the element.
   */
  tabIndex?: number
}

/**
 * displays an icon button.
 */
export default function IconButton({
  ariaLabel,
  css,
  className,
  color = 'inherit',
  icon,
  height = 16,
  width = 16,
  onClick,
  tabIndex,
  rounded = false,
  type = 'button',
  disabled = false,
}: IconButtonProps) {
  return (
    <ButtonContainer
      aria-label={ariaLabel}
      css={css}
      className={className}
      type={type}
      onClick={onClick}
      rounded={rounded}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      <Icon name={icon} color={color} height={height} width={width} />
    </ButtonContainer>
  )
}
