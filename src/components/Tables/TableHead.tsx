import styled from 'styled-components'

import { SORT_ORDER } from './Table'
import { Icon } from '../Icons'

export interface TableHeadProps {
  children: string
  paddings?: number
  onSortClick?: (key: string) => void
  stickyHeader?: boolean
  sortOrder?: SORT_ORDER
  sortable?: boolean
  verticalHeader?: boolean
}

const Th = styled.th<{ padding?: number; vertical: boolean; stickyHeader: boolean }>`
  font-size: 1.6rem;
  padding: ${(props) => `${props.padding || 16}px`};
  border: none;
  background-color: #f0f0f0;
  border-bottom: 1px solid #707070;
  text-align: ${(props) => (props.vertical ? 'left' : 'center')};
  ${(props) =>
    props.stickyHeader && {
      position: 'sticky',
      left: 0,
    }}
`

const ThButton = styled.button`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  font-weight: inherit;
  font-size: inherit;
`

const IconContainer = styled.span`
  margin-left: 6px;
  display: inline-flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1px;
    &:last-child {
      transform: rotate(180deg);
    }
  }
`

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
    <Th padding={paddings} vertical={verticalHeader} stickyHeader={stickyHeader}>
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
    <Th padding={paddings} vertical={verticalHeader} stickyHeader={stickyHeader}>
      {children}
    </Th>
  )
}
