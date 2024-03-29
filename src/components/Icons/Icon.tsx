import { forwardRef } from 'react'

import { styled, ROOT_FONT_SIZE } from 'styles'
import { IconName } from 'types/Icon'

export interface IconProps {
  /**
   * Specifies a name of the icon.
   */
  name: IconName

  /**
   * Specifies the height of the icon.
   */
  height?: number

  /**
   * Specifies the width of the icon.
   */
  width?: number

  /**
   * Specifies a color of the icon.
   */
  color?: string

  /**
   * Adds class to the element.
   */
  className?: string
}

const IconContainer = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
})

/**
 * displays an icon with the given name.
 */
const Icon = forwardRef<HTMLSpanElement, IconProps>(function (
  { name, className, color = 'inherit', height = 16, width = 16 }: IconProps,
  ref
) {
  return (
    <IconContainer
      ref={ref}
      className={className}
      css={{
        color,
        width: `${width / ROOT_FONT_SIZE}rem`,
        height: `${height / ROOT_FONT_SIZE}rem`,
      }}
    >
      <svg role="img" aria-label={name} height="100%" width="100%" fill="currentColor">
        <use href={`#simple-ui-icon-${name}`} />
      </svg>
    </IconContainer>
  )
})
Icon.displayName = 'Icon'

export default Icon
