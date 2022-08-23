import { TableProps } from '../Table'
import { Td } from './TableBody'
import TableRow from '../TableRow'

export default function TableContentHorizontal({ data, fields, rowHeight, paddings }: TableProps) {
  return (
    <>
      {data.map((item) => {
        const dataList = fields.map(({ key, renderCell }) => (
          <Td
            key={`${key}_${item.id}`}
            css={{
              padding: paddings,
            }}
          >
            {renderCell ? renderCell(item) : item[key]}
          </Td>
        ))

        const itemKey = item.id ? item.id : item[fields[0].key]
        return (
          <TableRow height={rowHeight} key={`dataList_${itemKey}`}>
            {dataList}
          </TableRow>
        )
      })}
    </>
  )
}
