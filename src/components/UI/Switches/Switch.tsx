import { ChangeEventHandler, forwardRef } from 'react'
import { styled } from 'styles'

const SwitchContainer = styled('label', {
  position: 'relative',
  display: 'inline-block',
  aspectRatio: 1.8,
})
const StyledInput = styled('input', {
  opacity: 0,
  width: 0,
  height: 0,
  '&:checked + span': {
    backgroundColor: '$success',
  },
  '&:checked + span:before': {
    borderColor: '$success',
    transform: 'translate(calc(100% * 0.8), 50%)',
  },
})
const Slider = styled('span', {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#ccc',
  transition: '.4s',
  '&:before': {
    position: 'absolute',
    content: '',
    aspectRatio: 1,
    height: '100%',
    border: '4px solid #ccc',
    boxSizing: 'border-box',
    bottom: '50%',
    transform: 'translateY(50%)',
    backgroundColor: '#fff',
    transition: '.3s',
    borderRadius: '50%',
  },
})

export interface SwitchProps {
  /**
   * Defines the component's aria-label.
   */
  ariaLabel?: string

  /**
   * Sets the default value.
   */
  defaultChecked?: boolean

  /**
   * Sets the component's height.
   */
  height?: number

  /**
   * Sets the component's name.
   */
  name?: string

  /**
   * Handles the click event.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>

  /**
   * Sets the current value.
   */
  value?: boolean
}

/**
 * displays a styled switch.
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(function (
  { ariaLabel, defaultChecked, height = 34, name, onChange, value }: SwitchProps,
  ref
) {
  return (
    <SwitchContainer css={{ height }}>
      <StyledInput
        aria-label={ariaLabel}
        ref={ref}
        name={name}
        type="checkbox"
        role="switch"
        onChange={onChange}
        defaultChecked={defaultChecked}
        checked={value}
      />
      <Slider css={{ borderRadius: height }} />
    </SwitchContainer>
  )
})

Switch.displayName = 'Switch'

export default Switch
