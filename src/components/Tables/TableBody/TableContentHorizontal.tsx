import { Fragment } from 'react'
import { styled } from 'styles'
import { Td, TableField } from './TableBody'
import TableRow from '../TableRow'
import { extractNestedObject } from '../utils'
import { SelectedRowKey } from '../Table'

export interface TableContentHorizontalProps<T> {
  data: T[]
  dataKey: string
  fields: TableField[]
  paddings: number
  rowHeight?: number
  hoverable: boolean
  onRowClick?: (item: SelectedRowKey, index: number) => void
  renderRowDetail?: (item: T) => JSX.Element
  selectedRows: SelectedRowKey[]
}

const TableDetail = styled('td', {
  borderBottom: '1px solid $darkGray',
  textAlign: 'start',
  transition: 'all .2s ease-in-out',
  variants: {
    isHidden: {
      true: {
        borderBottom: 'none',
        py: '0 !important',
      },
    },
  },
})

const TableDetailContainer = styled('div', {
  maxHeight: 0,
  overflow: 'hidden',
  transition: 'all .2s ease-in-out',
  variants: {
    show: {
      true: {
        maxHeight: '100vh',
      },
    },
  },
})

export default function TableContentHorizontal<T>({
  data,
  dataKey,
  fields,
  rowHeight,
  paddings,
  hoverable,
  onRowClick,
  renderRowDetail,
  selectedRows,
}: TableContentHorizontalProps<T>) {
  const isRowSelected = (key: any) => {
    return selectedRows.some((k) => k === key)
  }

  return (
    <>
      {data.map((item, index) => {
        const dataList = fields.map(({ key, title, renderCell }) => (
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
        const itemKey =
          dataKey && extractNestedObject(item, dataKey)
            ? extractNestedObject(item, dataKey)
            : extractNestedObject(item, fields[0].key)

        const selected = isRowSelected(itemKey)

        return (
          <Fragment key={`dataList_${itemKey}`}>
            <TableRow
              height={rowHeight}
              hoverable={hoverable}
              itemKey={itemKey}
              index={index}
              onRowClick={onRowClick}
              isActive={selected}
            >
              {dataList}
            </TableRow>
            {renderRowDetail && (
              <tr aria-hidden={!selected}>
                <TableDetail
                  css={{ padding: paddings }}
                  isHidden={!selected}
                  colSpan={fields.length}
                >
                  <TableDetailContainer show={selected}>
                    {renderRowDetail(item)}
                  </TableDetailContainer>
                </TableDetail>
              </tr>
            )}
          </Fragment>
        )
      })}
    </>
  )
}
