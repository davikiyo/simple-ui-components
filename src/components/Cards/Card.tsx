import { forwardRef } from 'react'

import styled from 'styled-components'

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
}

const CardContainer = styled.div<{ shadow?: boolean; border?: boolean }>`
  margin: 0;
  padding: 10px;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  ${(props) => props.border && 'border: 1px solid #707070;'}
  ${(props) => props.shadow && 'box-shadow: 2px 2px 6px #ccc;'}
`

/**
 * renders the card component.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function (
  { children, className, shadow = false, border = true },
  ref
) {
  return (
    <CardContainer className={className} ref={ref} shadow={shadow} border={border}>
      {children}
    </CardContainer>
  )
})
Card.displayName = 'Card'

export default Card
