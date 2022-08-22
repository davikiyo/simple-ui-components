import { Td, TableContentVerticalProps } from './TableBody'
import TableRow from '../TableRow'
import TableHead from '../TableHead'

export default function TableContentVertical({
  data,
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
            key={`${key}_${item.id}`}
            css={{
              padding: paddings,
            }}
          >
            {renderCell ? renderCell(item) : item[key]}
          </Td>
        ))

        return (
          <TableRow height={rowHeight} key={`dataList_${key}`}>
            <TableHead
              verticalHeader
              stickyHeader={stickyHeader}
              key={key}
              sortable={sortable}
              paddings={paddings}
              {...(sortable && {
                onSortClick: onSortClick,
              })}
              {...(key === sortKey.key && {
                sortOrder: sortKey.order,
              })}
            >
              {title ? title : (key as string)}
            </TableHead>
            {dataList}
          </TableRow>
        )
      })}
    </>
  )
}
