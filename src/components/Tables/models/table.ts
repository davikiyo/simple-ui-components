export type TableData<T extends Record<string, unknown> = any> = T & {
  /**
   * The ID of an item. Providing an ID is strongly recommended when using the sorting feature.
   */
  id?: string | number
}

export type TableKeys<T> = Extract<keyof T, string>

export type NestedKeys<
  T extends Record<string, unknown>,
  LIMIT extends number,
  A extends number[] = [],
  Key = keyof T
> = A['length'] extends LIMIT
  ? never
  : Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}` | `${Key}.${NestedKeys<T[Key], LIMIT, [...A, A['length']]>}`
    : `${Key}`
  : never

export type DataKeyType<T extends Record<string, unknown>> = NestedKeys<TableData<T>, 5>
