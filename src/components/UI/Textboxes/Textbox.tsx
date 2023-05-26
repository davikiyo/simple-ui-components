import { ChangeEventHandler, ComponentPropsWithRef, forwardRef } from 'react'

import { CSS, styled } from 'styles'

const InputContainer = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  fontFamily: '$main',
  variants: {
    block: {
      true: {
        width: '100%',
      },
    },
  },
})

const StyledLabel = styled('label', {
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'start',
  position: 'relative',
  variants: {
    error: {
      true: {
        color: '$red',
        '& > input': {
          borderColor: '$red',
        },
      },
    },
    block: {
      true: {
        width: '100%',
      },
    },
  },
})

const StyledInput = styled('input', {
  display: 'inline-flex',
  border: '1px solid $darkGray',
  height: '2.125rem',
  fontSize: '$md',
  padding: '$1 $2',
  outline: 'none',
  '& + span': {
    fontSize: '$md',
  },
  '&:focus + span': {
    top: '0px',
    transform: 'translate(-10%, -50%) scale(0.8)',
  },
  '&:not(:placeholder-shown) + span': {
    top: '0px',
    transform: 'translate(-10%, -50%) scale(0.8)',
  },
  '&:disabled': {
    color: '$darkGray',
    backgroundColor: '$lightGray',
  },
  variants: {
    block: {
      true: {
        width: '100%',
      },
    },
  },
})

const LabelText = styled('span', {
  position: 'absolute',
  left: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'all .15s cubic-bezier(.1,1,.8,1)',
  backgroundColor: 'transparent',
  '&:after': {
    content: '',
    position: 'absolute',
    color: '#000',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    transform: 'translateY(100%)',
    backgroundColor: '#fff',
    zIndex: -1,
  },
  variants: {
    disabled: {
      true: {
        color: '$darkGray',
        '&:after': {
          backgroundColor: '$lightGray',
        },
      },
    },
  },
})

const Feedback = styled('span', {
  display: 'inline-flex',
  marginTop: '$1',
  color: '$red',
})

export interface TextboxProps extends ComponentPropsWithRef<typeof StyledInput> {
  /**
   * Defines a class for the textbox.
   */
  className?: string

  /**
   * Spans the input to the container width
   */
  block?: boolean

  /**
   * Overrides the input style.
   */
  css?: CSS

  /**
   * Displays an error message.
   */
  error?: string | boolean

  /**
   * Provides a label to the input.
   */
  label?: string

  /**
   * Changes the element to a number type.
   */
  number?: boolean

  /**
   * Handles changes in the input.
   *
   * @param event - The change event.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
}

/**
 * displays a styled input.
 */
const Textbox = forwardRef<HTMLInputElement, TextboxProps>(function (
  {
    className,
    css,
    error,
    block = false,
    label = '',
    number = false,
    onChange,
    ...rest
  }: TextboxProps,
  ref
) {
  const { disabled, name, value, defaultValue, placeholder } = rest

  return (
    <InputContainer className={className} block={block}>
      <StyledLabel error={!!error} block={block}>
        <StyledInput
          {...rest}
          aria-describedby={`${name}_error`}
          placeholder={placeholder || ' '}
          block={block}
          css={css}
          onChange={onChange}
          ref={ref}
          type={number ? 'number' : 'text'}
          defaultValue={defaultValue}
          value={value}
        />
        <LabelText disabled={disabled}>{label}</LabelText>
      </StyledLabel>
      {typeof error === 'string' && error && <Feedback id={`${name}_error`}>{error}</Feedback>}
    </InputContainer>
  )
})
Textbox.displayName = 'Textbox'

export default Textbox
