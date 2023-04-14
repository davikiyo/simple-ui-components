import { Td, TableField } from './TableBody'
import TableRow from '../TableRow'
import { extractNestedObject } from '../utils'

export interface TableContentHorizontalProps {
  data: object[]
  dataKey: string
  fields: TableField[]
  rowHeight?: number
  paddings: number
}

export default function TableContentHorizontal({
  data,
  dataKey,
  fields,
  rowHeight,
  paddings,
}: TableContentHorizontalProps) {
  return (
    <>
      {data.map((item) => {
        const dataList = fields.map(({ key, renderCell }) => (
          <Td
            key={`${key}_${
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
        const itemKey =
          dataKey && extractNestedObject(item, dataKey)
            ? extractNestedObject(item, dataKey)
            : extractNestedObject(item, fields[0].key)

        return (
          <TableRow height={rowHeight} key={`dataList_${itemKey}`}>
            {dataList}
          </TableRow>
        )
      })}
    </>
  )
}
