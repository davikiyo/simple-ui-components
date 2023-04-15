import { Td, TableField } from './TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'
import { extractNestedObject } from '../utils'
import { SORT_ORDER } from '../Table'

export interface TableContentVerticalProps {
  data: object[]
  dataKey: string
  fields: TableField[]
  rowHeight?: number
  paddings: number
  sortKey: {
    key: string
    order: SORT_ORDER
  }
  onSortClick: (key: string) => void
  stickyHeader: boolean
}

export default function TableContentVertical({
  data,
  dataKey,
  fields,
  rowHeight,
  paddings,
  sortKey,
  stickyHeader,
  onSortClick,
}: TableContentVerticalProps) {
  return (
    <>
      {fields.map(({ key, title, sortable, renderCell }) => {
        const dataList = data.map((item) => (
          <Td
            // Assign key & title when there are duplicate keys
            key={`${key}_${title || ''}_${
              dataKey && extractNestedObject(item, dataKey)
                ? extractNestedObject(item, dataKey)
                : extractNestedObject(item, key)
            }`}
            css={{
              padding: paddings,
            }}
          >
            {renderCell ? renderCell(item) : extractNestedObject(item, key)}
          </Td>
        ))

        return (
          <TableRow height={rowHeight} key={`dataList_${key}`}>
            <TableHead
              verticalHeader
              stickyHeader={stickyHeader}
              // Assign key & title when there are duplicate keys
              key={`${key}_${title || ''}`}
              sortable={sortable}
              paddings={paddings}
              {...(sortable && {
                onSortClick,
              })}
              {...(key === sortKey.key && {
                sortOrder: sortKey.order,
              })}
            >
              {title || key}
            </TableHead>
            {dataList}
          </TableRow>
        )
      })}
    </>
  )
}
