import { ReactNode, HTMLProps, forwardRef } from 'react'
import { styled } from 'styles'

const LI = styled('li', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export interface ListItemProps extends HTMLProps<HTMLLIElement> {
  /**
   * Contents to be displayed.
   */
  children?: ReactNode
}

/**
 * displays a styled `li` element.
 */
const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function (
  { children, ...props }: ListItemProps,
  ref
) {
  return (
    <LI {...props} ref={ref}>
      {children}
    </LI>
  )
})
ListItem.displayName = 'ListItem'

export default ListItem
