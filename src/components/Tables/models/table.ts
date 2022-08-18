type TableDataType<T> = {
  /**
   * The key value pair item to be displayed on the table.
   * The `key` must exist in `fields` to be displayed.
   */
  [Key in Extract<keyof T, string>]?: T[Key]
}

export type TableData<T = any> = TableDataType<T> & {
  /**
   * The ID of an item.
   */
  id: string | number
}

export type TableKeys<T = any> = Extract<keyof T, string>

export type TableField<T = any> = {
  key: TableKeys<T>
  title?: string
  sortable?: boolean
  renderCell?: (data: T) => React.ReactNode
}
