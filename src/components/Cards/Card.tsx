import React from 'react'

import styled from 'styled-components'

export interface CardProps {
  /** Card contents */
  children?: React.ReactNode
  /** Appends a class to the card */
  className?: string
  /** Displays the shadow */
  shadow?: boolean
  /** Displays the border */
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
 * renders the card component
 *
 * @param {GridProps} param
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function (
  { children, className, shadow = false, border = true },
  ref
) {
  return (
    <CardContainer className={className} ref={ref} shadow={shadow} border={border}>
      {children}
    </CardContainer>
  )
})

export default Card
