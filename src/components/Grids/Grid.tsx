import React from 'react'

import { styled } from 'styles'

export interface GridProps {
  /**
   * Specifies the number of maximum columns.
   */
  maxColumn?: number

  /**
   * Specifies the gap between items.
   */
  gap?: number

  /**
   * Specifies the minimum width of each child.
   */
  minWidth?: number

  /**
   * Child nodes to be displayed in grid.
   */
  children: React.ReactNode[]
}

const GridContainer = styled('div', {
  /**
   * Calculated values.
   */
  $$gapCount: 'calc($$columnCount - 1)',
  $$totalGapWidth: 'calc($$gapCount * $$layoutGap)',
  $$gridMaxWidth: 'calc((100% - $$totalGapWidth) / $$columnCount)',
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(max($$minWidth, $$gridMaxWidth), 1fr))`,
  gridGap: '$$layoutGap',
})

/**
 * renders the children in the specified columns and gap.
 */
export default function Grid({ maxColumn = 4, gap = 10, minWidth = 250, children }: GridProps) {
  return (
    <GridContainer
      css={{
        $$columnCount: maxColumn,
        $$layoutGap: `${gap}px`,
        $$minWidth: `${minWidth}px`,
      }}
    >
      {children}
    </GridContainer>
  )
}
