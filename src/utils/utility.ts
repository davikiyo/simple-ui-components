import styled, { AnyStyledComponent } from 'styled-components'

import { SORT_ORDER } from '../components/Tables'
/**
 * A wrapper function that wraps the `styled` function
 * from `styled-components`. You can extend the style using this function.
 *
 * @param component
 */
export const extendStyle = (component: AnyStyledComponent) => styled(component)

/**
 * Performs sorting to an array of objects.
 *
 * @param data - An array of objects
 * @param key - A key of the item to be sorted by.
 * @param order - The order to sort the array.
 */
export const sortObjects = (data: any[], key: string, order: SORT_ORDER) => {
  switch (order) {
    case SORT_ORDER.ASC:
      data.sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      })
      break

    case SORT_ORDER.DESC:
      data.sort((a, b) => {
        if (a[key] > b[key]) return -1
        if (a[key] < b[key]) return 1
        return 0
      })
      break
  }
}
