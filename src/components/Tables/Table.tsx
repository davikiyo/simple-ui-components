import { useEffect, useMemo, useState } from 'react'

import { styled, CSS } from 'styles'
import { sortObjects } from 'utils/utility'

import type { DataKeyType, TableData } from './models/table'
import TableBody, { TableField } from './TableBody'
import TableHead from './TableHead'
import TableRow from './TableRow'

export type SortKeyType = {
  key: string
  order: SORT_ORDER
}

export interface TableFieldType<T> extends TableField {
  key: DataKeyType<T>
  renderCell?: (data: TableData<T>) => JSX.Element | string
}

export interface TableProps<T> {
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
  data: TableData<T>[]

  /**
   * The property to be used as a key. (Default: `id`)
   *
   * **NOTE:** You can provide a key delimited by period (.) to get
   * the recursive item up to 5 recursion.
   *
   * @example
   * An example using `symbol` in `company`.
   * ```
   * const data = [
   *  {
   *    id: "C1",
   *    company: {
   *      name: "Example"
   *      symbol: "EXAM"
   *    }
   *  }
   * ]
   *  <Table
   *    dataKey="company.symbol"
   *   //...
   *  />
   * ```
   */
  dataKey?: DataKeyType<T>

  /**
   * The table field information. Matches the key in `data`.
   * If no `title` is provided, the `key` properties are displayed as titles.
   * The fields becomes sortable by providing the `sortable` flag.
   *
   * **NOTE:** You can provide a key delimited by period (.) to get
   * the nested item. (Up to depth of 5)
   *
   * @example
   * An example using `symbol` in `company`.
   * ```
   * const data = [
   *  {
   *    id: "C1",
   *    company: {
   *      name: "Example"
   *      symbol: "EXAM"
   *    }
   *  }
   * ]
   * const fields = [
   *  {
   *    key: "company.name",
   *    title: "Company Name"
   *  },
   *  {
   *    key: "company.symbol",
   *    title: "Symbol"
   *  }
   * ]
   *  <Table
   *    data={data}
   *    fields={fields}
   *    //...
   *  />
   * ```
   */
  fields: TableFieldType<T>[]

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

/** displays the given data in a styled table. */
export default function Table<T>({
  className,
  css,
  tableCss,
  data,
  dataKey = 'id',
  fields,
  rowHeight,
  height,
  width,
  onSortRequest,
  paddings = 16,
  stickyHeader = false,
  verticalHeader = false,
}: TableProps<T>) {
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
    if (sortKey.key && onSortRequest) onSortRequest(sortKey)
  }, [sortKey])

  const onSortHandler = (title: string) => {
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
                  // Assign key & title when there are duplicate keys
                  key={`${key}_${title || ''}`}
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
                  {title || key}
                </TableHead>
              ))}
            </TableRow>
          </TableHeadContainer>
        )}
        <TableBody
          data={tableData}
          dataKey={dataKey}
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
