import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useState,
} from 'react'

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
  const { disabled, name, value, defaultValue } = rest
  const [isEmpty, setEmpty] = useState(!value && !defaultValue)

  // Set isEmpty to true if the given value is empty, otherwise set to false.
  // It is only validated when the value prop is provided.
  useEffect(() => {
    value != undefined && defaultValue != undefined && setEmpty(!value && !defaultValue)
  }, [value, defaultValue])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    // This validation is required for the uncontrolled textbox.
    setEmpty(!e.target.value)
    onChange && onChange(e)
  }

  return (
    <InputContainer className={className} block={block}>
      <StyledLabel error={!!error} block={block}>
        <StyledInput
          {...rest}
          aria-describedby={`${name}_error`}
          block={block}
          css={css}
          onChange={handleOnChange}
          ref={ref}
          type={number ? 'number' : 'text'}
          defaultValue={defaultValue}
          value={value}
        />
        <LabelText notEmpty={!isEmpty} disabled={disabled}>
          {label}
        </LabelText>
      </StyledLabel>
      {typeof error === 'string' && error && <Feedback id={`${name}_error`}>{error}</Feedback>}
    </InputContainer>
  )
})
Textbox.displayName = 'Textbox'

export default Textbox
