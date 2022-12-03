import { ReactNode, HTMLProps, forwardRef } from 'react'
import { CSS, styled } from 'styles'

const UL = styled('ul', {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  variants: {
    border: {
      true: {
        '& > li': {
          borderTop: '1px solid $darkGray',

          '&:last-child': {
            borderBottom: '1px solid $darkGray',
          },
        },
      },
    },
    padding: {
      none: {
        '& > li': {
          padding: 0,
        },
      },
      sm: {
        '& > li': {
          padding: '$2',
        },
      },
      md: {
        '& > li': {
          padding: '$3',
        },
      },
      lg: {
        '& > li': {
          padding: '$4',
        },
      },
    },
  },
})

export interface ListProps extends HTMLProps<HTMLUListElement> {
  /**
   * Displays borders on list items.
   */
  border?: boolean

  /**
   * Contents to be displayed.
   */
  children?: ReactNode

  /**
   * Overrides the list style.
   */
  css?: CSS

  /**
   * Sets paddings in the list.
   */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

/**
 * displays a styled `ul` element.
 */
const List = forwardRef<HTMLUListElement, ListProps>(function (
  { border = false, children, css, padding = 'md', ...props }: ListProps,
  ref
) {
  return (
    <UL {...props} ref={ref} css={css} border={border} padding={padding}>
      {children}
    </UL>
  )
})
List.displayName = 'List'

export default List
