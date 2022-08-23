import { forwardRef } from 'react'

import { styled } from 'styles'

export interface CardProps {
  /**
   * Contents to be displayed in the card.
   */
  children?: React.ReactNode

  /**
   * A class to be appended to the card.
   */
  className?: string

  /**
   * Displays shadow.
   */
  shadow?: boolean

  /**
   * Displays borders.
   */
  border?: boolean

  /**
   * Spacings between the contents and card.
   */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}

const CardContainer = styled('div', {
  margin: 0,
  borderRadius: '8px',
  display: 'inline-flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  variants: {
    border: {
      true: {
        border: '1px solid #707070',
      },
    },
    shadow: {
      true: {
        boxShadow: '2px 2px 6px #ccc',
      },
    },
    padding: {
      none: {
        padding: '$0',
      },
      xs: {
        padding: '$1',
      },
      sm: {
        padding: '$2',
      },
      md: {
        padding: '$3',
      },
      lg: {
        padding: '$4',
      },
    },
  },
})

/**
 * renders the card component.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function (
  { children, className, shadow = false, border = true, padding = 'sm' },
  ref
) {
  return (
    <CardContainer
      className={className}
      ref={ref}
      shadow={shadow}
      border={border}
      padding={padding}
    >
      {children}
    </CardContainer>
  )
})
Card.displayName = 'Card'

export default Card
