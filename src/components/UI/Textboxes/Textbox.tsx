import { ChangeEvent, ChangeEventHandler, ComponentPropsWithRef, forwardRef, useState } from 'react'

import { CSS, styled } from 'styles'

const InputContainer = styled('div', {
  fontFamily: '$main',
})

const StyledLabel = styled('label', {
  display: 'flex',
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
  transition: 'all .1s ease-out',
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
    notEmpty: {
      true: {
        top: '0px',
        transform: 'translate(-10%, -50%) scale(0.8)',
      },
    },
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
  display: 'inline-block',
  marginTop: '$1',
  color: '$red',
})

export interface TextboxProps extends ComponentPropsWithRef<typeof StyledInput> {
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
  { css, error, block = false, label = '', onChange, ...rest }: TextboxProps,
  ref
) {
  const { disabled, name, value } = rest
  const [notEmpty, setEmpty] = useState(!!value)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmpty(!!e.target.value)
    onChange && onChange(e)
  }

  return (
    <InputContainer>
      <StyledLabel error={!!error}>
        <StyledInput
          {...rest}
          aria-describedby={`${name}_error`}
          block={block}
          css={css}
          onChange={handleOnChange}
          ref={ref}
          type="text"
          value={value}
        />
        <LabelText notEmpty={notEmpty} disabled={disabled}>
          {label}
        </LabelText>
      </StyledLabel>

      <Feedback id={`${name}_error`}>{typeof error === 'string' && error}</Feedback>
    </InputContainer>
  )
})
Textbox.displayName = 'Textbox'

export default Textbox
