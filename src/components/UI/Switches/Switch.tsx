import { forwardRef, ComponentPropsWithRef } from 'react'
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
    height: '100%',
    width: 'fit-content',
    aspectRatio: 1,
    border: '4px solid #ccc',
    boxSizing: 'border-box',
    bottom: '50%',
    transform: 'translateY(50%)',
    backgroundColor: '#fff',
    transition: '.3s',
    borderRadius: '50%',
  },
})

interface Props extends ComponentPropsWithRef<typeof StyledInput> {
  /**
   * Sets the component's height.
   */
  height?: number
}

export type SwitchProps = Omit<Props, 'type' | 'role' | 'value' | 'defaultValue' | 'width'>

/**
 * displays a styled switch.
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(function (
  { height = 34, ...props }: SwitchProps,
  ref
) {
  return (
    <SwitchContainer css={{ height }}>
      <StyledInput ref={ref} type="checkbox" role="switch" {...props} />
      <Slider css={{ borderRadius: height }} />
    </SwitchContainer>
  )
})

Switch.displayName = 'Switch'

export default Switch
