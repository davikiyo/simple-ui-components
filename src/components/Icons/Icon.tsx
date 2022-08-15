import React from 'react'
import styled from 'styled-components'

import svgSrc from 'assets/icons.svg'

export interface IconProps {
  /** Specifies a name of the icon */
  name: string
  /** Specifies the height of the icon */
  height: number
  /** Specifies the width of the icon */
  width: number
  /** Specifies a color of the icon */
  color?: string
  /** Adds class to the element */
  className?: string
}

const IconContainer = styled.span<{ height: number; width: number; color: string }>`
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.color};
  max-width: ${(props) => `${props.height}px`};
  max-height: ${(props) => `${props.width}px`};
`

/** Displays an icon with the given name */
const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function (
  { name, height, width, className, color = 'inherit' },
  ref
) {
  return (
    <IconContainer ref={ref} className={className} height={height} width={width} color={color}>
      <svg width={width} height={height} fill="currentColor">
        <use href={`${svgSrc}#${name}`} />
      </svg>
    </IconContainer>
  )
})

export default Icon
