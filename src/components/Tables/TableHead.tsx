import { styled } from 'styles'

import { SORT_ORDER } from './Table'
import { Icon } from '../Icons'

export interface TableHeadProps {
  children: string
  paddings: number
  onSortClick?: (key: string) => void
  stickyHeader?: boolean
  sortOrder?: SORT_ORDER
  sortable?: boolean
  verticalHeader?: boolean
}

const Th = styled('th', {
  fontSize: '$md',
  border: 'none',
  backgroundColor: '#f0f0f0',
  borderBottom: '1px solid #707070',
  textAlign: 'center',
  variants: {
    vertical: {
      true: {
        textAlign: 'left',
      },
    },
    stickyHeader: {
      true: {
        position: 'sticky',
        left: 0,
      },
    },
  },
})

const ThButton = styled('button', {
  fontFamily: '$main',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'inherit',
  fontSize: 'inherit',
})

const IconContainer = styled('span', {
  marginLeft: '6px',
  display: 'inline-flex',
  flexDirection: 'column',

  '& > *': {
    marginBottom: '2px',
    '&:last-child': {
      transform: 'rotate(180deg)',
    },
  },
})

export default function TableHead({
  children,
  sortOrder,
  paddings,
  onSortClick,
  stickyHeader = false,
  sortable = false,
  verticalHeader = false,
}: TableHeadProps) {
  return sortable ? (
    <Th
      css={{
        padding: paddings,
      }}
      vertical={verticalHeader}
      stickyHeader={stickyHeader}
    >
      <ThButton onClick={() => onSortClick && onSortClick(children)}>
        {children}
        <IconContainer>
          <Icon
            name="sorting-arrow-up"
            height={6}
            width={8}
            color={sortOrder === SORT_ORDER.ASC ? '#4e4e4e' : '#b5b5b5'}
          />
          <Icon
            name="sorting-arrow-up"
            height={6}
            width={8}
            color={sortOrder === SORT_ORDER.DESC ? '#4e4e4e' : '#b5b5b5'}
          />
        </IconContainer>
      </ThButton>
    </Th>
  ) : (
    <Th
      css={{
        padding: paddings,
      }}
      vertical={verticalHeader}
      stickyHeader={stickyHeader}
    >
      {children}
    </Th>
  )
}
