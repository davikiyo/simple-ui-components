export type TableData<T = any> = T & {
  /**
   * The ID of an item. Providing an ID is strongly recommended when using the sorting feature.
   */
  id?: string | number
}

export type NestedKeys<
  T extends Record<string, any>,
  LIMIT extends number,
  A extends number[] = [],
  Key = keyof T
> = A['length'] extends LIMIT
  ? never
  : Key extends string
  ? T[Key] extends Record<string, any>
    ? `${Key}` | `${Key}.${NestedKeys<T[Key], LIMIT, [...A, A['length']]>}`
    : `${Key}`
  : never

export type DataKeyType<T> = NestedKeys<TableData<T>, 5>
