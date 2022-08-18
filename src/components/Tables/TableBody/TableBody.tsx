import styled from 'styled-components'
import { TableKeys } from '../models/table'

import { TableProps, SortKeyType } from '../Table'
import TableContentHorizontal from './TableContentHorizontal'
import TableContentVertical from './TableContentVertical'

export const Td = styled.td<{ padding?: number }>`
  padding: ${(props) => `${props.padding || 16}px`};
  border-bottom: 1px solid #707070;
`

export const TBody = styled.tbody`
  font-size: 1.4rem;
  text-align: center;
`

export interface TableContentVerticalProps extends TableProps {
  onSortClick: (title: TableKeys) => void
  sortKey: SortKeyType
}

export default function TableBody({
  sortKey,
  onSortClick,
  verticalHeader,
  ...tableProps
}: TableContentVerticalProps) {
  return (
    <TBody>
      {verticalHeader ? (
        <TableContentVertical {...tableProps} sortKey={sortKey} onSortClick={onSortClick} />
      ) : (
        <TableContentHorizontal {...tableProps} />
      )}
    </TBody>
  )
}
