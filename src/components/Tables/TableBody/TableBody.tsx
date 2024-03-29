import { styled } from 'styles'

import TableContentHorizontal, { TableContentHorizontalProps } from './TableContentHorizontal'
import TableContentVertical, { TableContentVerticalProps } from './TableContentVertical'
import { TableData } from '../models/table'

export const Td = styled('td', {
  borderBottom: '1px solid $darkGray',
})

export const TBody = styled('tbody', {
  fontSize: '$sm',
  textAlign: 'center',
})

export interface TableField {
  key: string
  title?: string
  sortable?: boolean
  renderCell?: (data: TableData) => JSX.Element | string
}

export interface TableContentProps<T>
  extends TableContentHorizontalProps<T>,
    TableContentVerticalProps<T> {
  verticalHeader: boolean
}

export default function TableBody<T>({
  sortKey,
  onSortClick,
  verticalHeader,
  ...tableProps
}: TableContentProps<T>) {
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
