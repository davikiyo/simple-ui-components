type NestedObjectFunc<T extends object = any> = (obj: T, key: string, delimiter?: string) => T

export const extractNestedObject: NestedObjectFunc = <T extends object = any>(
  obj: T,
  key: string,
  delimiter = '.'
) => {
  const currKeys = key.split(delimiter)
  const currKey = currKeys.shift()

  if (typeof obj[currKey as keyof T] === 'object' && currKeys.length > 0) {
    return extractNestedObject(obj[currKey as keyof T], currKeys.join(delimiter), delimiter)
  }

  return typeof obj[currKey as keyof T] === 'object'
    ? JSON.stringify(obj[currKey as keyof T])
    : obj[currKey as keyof T]
}
