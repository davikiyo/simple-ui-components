import { styled } from 'styles'

import { TableKeys } from '../models/table'
import { TableProps, SortKeyType } from '../Table'
import TableContentHorizontal from './TableContentHorizontal'
import TableContentVertical from './TableContentVertical'

export const Td = styled('td', {
  borderBottom: '1px solid #707070',
})

export const TBody = styled('tbody', {
  fontSize: '$sm',
  textAlign: 'center',
})

export interface TableContentVerticalProps extends TableProps {
  paddings: number
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
