import { useEffect, useMemo, useState } from 'react'
// import { CSS } from '@stitches/react'

import { styled, CSS } from 'styles'

import { TableField, TableKeys, TableData } from './models/table'
import TableBody from './TableBody'
import TableHead from './TableHead'
import TableRow from './TableRow'
import { sortObjects } from '../../utils/utility'

export interface TableProps {
  /**
   * Overrides the style in the table container.
   */
  css?: CSS

  /**
   * Overrides the style in the table container.
   */
  tableCss?: CSS

  /**
   * Defines a class for table's container.
   */
  className?: string

  /**
   * The table data. Matches the key in the fields.
   * If no key is found in the `fields`, the value will be ignored.
   */
  data: TableData[]

  /**
   * The table field information. Matches the key in `data`.
   * If no `title` is provided, the `key` properties are displayed as titles.
   * The fields becomes sortable by providing the `sortable` flag.
   */
  fields: TableField[]

  /**
   * Defines the paddings for each cell in the table.
   */
  paddings?: number

  /**
   * Handles the event when clicked on sort buttons. The function passes the
   * current sort key as an argument.
   *
   * **NOTE:** If the function is omitted, the table itself will handle the sorting.
   * @param sortKey - A key of the column that user pressed.
   */
  onSortRequest?: (sortKey: SortKeyType) => void

  /**
   * Defines the height of each row in the table.
   */
  rowHeight?: number

  /**
   * Defines the width of the table.
   */
  width?: number | string

  /**
   * Defines the height of the table.
   */
  height?: number | string

  /**
   * Display the header in a sticky manner.
   */
  stickyHeader?: boolean

  /**
   * Display the header in a vertical manner.
   */
  verticalHeader?: boolean
}

const Container = styled('div', {
  fontFamily: '$main',
  display: 'inline-block',
  padding: 0,
  margin: 0,
  overflow: 'auto',
})

const TableContainer = styled('table', {
  border: 'none',
  borderSpacing: 0,
})

const TableHeadContainer = styled('thead', {
  margin: 0,
  backgroundColor: '#f0f0f0',
  zIndex: 10,
  variants: {
    stickyHeader: {
      true: {
        position: 'sticky',
        top: 0,
      },
    },
  },
})

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortKeyType = { key: TableKeys; order: SORT_ORDER }

/** displays the given data in a styled table. */
export default function Table({
  className,
  css,
  tableCss,
  data,
  fields,
  rowHeight,
  height,
  width,
  onSortRequest = undefined,
  paddings = 16,
  stickyHeader = false,
  verticalHeader = false,
}: TableProps) {
  const [sortKey, setSortKey] = useState<SortKeyType>({
    key: '',
    order: SORT_ORDER.ASC,
  })

  const tableData = useMemo(() => {
    if (!onSortRequest) {
      const sortedData = [...data]
      sortObjects(sortedData, sortKey.key, sortKey.order)
      return sortedData
    }

    return data
  }, [data, sortKey])

  useEffect(() => {
    if (sortKey.key) onSortRequest && onSortRequest(sortKey)
  }, [sortKey, onSortRequest])

  const onSortHandler = (title: TableKeys) => {
    const key = fields.find((field) => field.key === title || field.title === title)?.key
    if (key) {
      const currentOrder =
        key === sortKey.key && sortKey.order === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC

      setSortKey({ key, order: currentOrder })
    }
  }

  return (
    <Container
      className={className}
      css={{
        ...css,
        height,
        width,
      }}
      {...((height || width) && { tabIndex: 0 })}
    >
      <TableContainer css={{ width, height, ...tableCss }}>
        {!verticalHeader && (
          <TableHeadContainer stickyHeader={stickyHeader}>
            <TableRow height={rowHeight}>
              {fields.map(({ key, title, sortable }) => (
                <TableHead
                  key={key}
                  sortable={sortable}
                  paddings={paddings}
                  stickyHeader={stickyHeader}
                  {...(sortable && {
                    onSortClick: onSortHandler,
                  })}
                  {...(key === sortKey.key && {
                    sortOrder: sortKey.order,
                  })}
                >
                  {title ? title : (key as string)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeadContainer>
        )}
        <TableBody
          data={onSortRequest ? data : tableData}
          fields={fields}
          rowHeight={rowHeight}
          paddings={paddings}
          verticalHeader={verticalHeader}
          stickyHeader={stickyHeader}
          sortKey={sortKey}
          onSortClick={onSortHandler}
        />
      </TableContainer>
    </Container>
  )
}
