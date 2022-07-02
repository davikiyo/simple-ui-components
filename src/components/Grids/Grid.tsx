import React from 'react'
import styled from 'styled-components'

export interface GridProps {
  /** Specifies the number of maximum columns */
  maxColumn?: number
  /** specifies the gap between items */
  gap?: number
  /** Specifies the minimum width of each child */
  minWidth?: number
  /** Child nodes to be displayed in grid */
  children: React.ReactNode[]
}

interface GridContainerProps {
  columns: number
  gap: number
  minWidth: number
}

const GridContainer = styled.div<GridContainerProps>`
  /**
   * User input values.
   */
  --grid-layout-gap: ${({ gap }) => `${gap}px`};
  --grid-column-count: ${({ columns }) => columns};
  --grid-item--min-width: ${({ minWidth }) => `${minWidth}px`};

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc((100% - var(--total-gap-width)) / var(--grid-column-count));

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  grid-gap: var(--grid-layout-gap);
`

/**
 * renders the children in the specified columns and gap
 *
 * @param {GridProps} param
 */
export default function Grid({ maxColumn = 4, gap = 10, minWidth = 250, children }: GridProps) {
  return (
    <GridContainer columns={maxColumn} gap={gap} minWidth={minWidth}>
      {children}
    </GridContainer>
  )
}
