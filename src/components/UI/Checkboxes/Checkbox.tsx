import { useState } from 'react'

import { styled } from 'styles'
import { Icon } from '../../Icons'

const CheckboxContainer = styled('span', {
  display: 'inline-flex',
  position: 'relative',
  transition: 'all .1s ease-out',
  outline: 'none',
  cursor: 'pointer',
  variants: {
    disabled: {
      true: {
        '& svg': {
          color: '$darkGray',
          filter: 'none !important',
        },
        pointerEvents: 'none',
      },
    },
  },
  '@bp3': {
    '&:hover, &:focus-visible': {
      '& svg': {
        filter: 'drop-shadow(2px 2px 2px #707070)',
      },
    },
  },
})

const StyledInput = styled('input', {
  visibility: 'hidden',
  position: 'absolute',
  width: '15px',
  height: '15px',
  margin: 0,
  left: 0,
  top: 0,
})

export interface CheckboxProps {
  /**
   * Defines a class for the checkbox.
   */
  className?: string

  /**
   * Provides a name to the checkbox.
   */
  name?: string

  /**
   * The icon to be displayed on the un-checked state.
   */
  icon?: React.ReactNode

  /**
   * The icon to be displayed on the checked state.
   */
  iconChecked?: React.ReactNode

  /**
   * Defines an ID for the checkbox.
   */
  id?: string

  /**
   * Handles the change.
   *
   * @param checked - The checkbox state.
   */
  onChange?: (checked: boolean) => void

  /**
   * Sets the checked state.
   */
  checked?: boolean

  /**
   * Disables the checkbox.
   */
  disabled?: boolean
}

/**
 * displays a styled checkbox.
 */
export default function Checkbox({
  className,
  name = 'checkbox',
  onChange,
  icon = <Icon name="checkbox-unchecked" height={15} width={15} color="#707070" />,
  iconChecked = <Icon name="checkbox-checked" height={15} width={15} color="#3f51b5" />,
  id,
  checked = false,
  disabled = false,
}: CheckboxProps) {
  const [isChecked, setChecked] = useState(checked)
  const [transitionStyle, setTransitionStyle] = useState({ opacity: 1, transition: 'opacity .1s' })

  const handleOnClick = () => {
    if (disabled) return

    onChange && onChange(!isChecked)
    handleTransition()
  }

  const handleTransition = () => {
    setTransitionStyle({ ...transitionStyle, opacity: 0 })
    setTimeout(() => {
      setChecked(!isChecked)
      setTransitionStyle({
        ...transitionStyle,
        opacity: 1,
      })
    }, 100)
  }

  return (
    <CheckboxContainer
      id={id}
      className={className}
      css={transitionStyle}
      aria-label={name}
      role="checkbox"
      tabIndex={0}
      onKeyDown={(event) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) handleOnClick()
      }}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {isChecked ? iconChecked : icon}
      <StyledInput type="checkbox" name={name} defaultChecked={isChecked} disabled={disabled} />
    </CheckboxContainer>
  )
}
