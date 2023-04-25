import { styled } from 'styles'
import { SelectedRowKey } from './Table'

export interface TableRowProps {
  children: React.ReactNode[]
  hoverable?: boolean
  height?: number
  itemKey?: SelectedRowKey
  index?: number
  onRowClick?: (itemKey: SelectedRowKey, index: number) => void
  isActive?: boolean
}

const Tr = styled('tr', {
  variants: {
    hoverable: {
      true: {
        '&:hover': {
          backgroundColor: '$lightGraySecondary',
          cursor: 'pointer',
        },
      },
    },
    isActive: {
      true: {
        backgroundColor: '$lightGraySecondary',
      },
    },
  },
})

export default function TableRow({
  children,
  height,
  hoverable,
  itemKey,
  index,
  onRowClick,
  isActive,
}: TableRowProps) {
  return (
    <Tr
      css={{
        height,
      }}
      {...(hoverable && { role: 'button', tabIndex: -1, hoverable })}
      {...(onRowClick && {
        onClick: (event) => {
          if (
            (event.target as Element).nodeName === 'TD' ||
            (event.target as Element).nodeName === 'TR'
          ) {
            onRowClick(itemKey!, index!)
          }
        },
      })}
      isActive={isActive}
    >
      {children}
    </Tr>
  )
}
