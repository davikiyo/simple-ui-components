import styled, { AnyStyledComponent } from 'styled-components'

/**
 * A wrapper function that wraps the `styled` function
 * from `styled-components`. You can extend the style using this function.
 *
 * @param component
 */
export const extendStyle = (component: AnyStyledComponent) => styled(component)
