import { useState } from 'react'

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
  variants: {
    block: {
      true: {
        width: '100%',
      },
    },
  },
})

const Label = styled('span', {
  position: 'absolute',
  left: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'all .1s ease-out',
  backgroundColor: '#fff',
  variants: {
    notEmpty: {
      true: {
        top: '0px',
        transform: 'translate(-10%, -50%) scale(0.8)',
      },
    },
  },
})

const Feedback = styled('span', {
  display: 'inline-block',
  marginTop: '$1',
  color: '$red',
})

export interface TextboxProps {
  /**
   * Spans the input to the container width
   */
  block?: boolean

  /**
   * Overrides the input style.
   */
  css?: CSS

  /**
   * Disables the input.
   */
  disabled?: boolean

  /**
   * Displays an error message.
   */
  error?: string | boolean

  /**
   * Provides a label to the input.
   */
  label?: string

  /**
   * Provides a name to the input.
   */
  name?: string

  /**
   * Handles changes in the input.
   *
   * @param value - The input value
   */
  onChange?: (value: string) => void

  /**
   * Provides a placeholder to the input.
   */
  placeholder?: string

  /**
   * Provides a value to the controlled input.
   */
  value?: string
}

/**
 * displays a styled input.
 */
export default function Textbox({
  css,
  onChange,
  error,
  block = false,
  name = '',
  label = '',
  value = '',
  placeholder = '',
  disabled = false,
}: TextboxProps) {
  const [notEmpty, setEmpty] = useState(!!value)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(!!e.target.value)
    onChange && onChange(e.target.value)
  }

  return (
    <InputContainer>
      <StyledLabel error={!!error}>
        <StyledInput
          aria-describedby={`${name}_error`}
          block={block}
          css={css}
          disabled={disabled}
          name={name}
          onChange={handleOnChange}
          placeholder={placeholder}
          type="text"
          {...(onChange && {
            value,
          })}
        />
        <Label notEmpty={notEmpty}>{label}</Label>
      </StyledLabel>

      <Feedback id={`${name}_error`}>{typeof error === 'string' && error}</Feedback>
    </InputContainer>
  )
}
