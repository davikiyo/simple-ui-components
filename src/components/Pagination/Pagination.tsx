import React from 'react'
import styled from 'styled-components'
import { Icon } from '../Icons'
import Paginator from './Paginator'

export interface PaginationProps {
  /** Number of total pages */
  pages: number
  /** The current page number */
  currentPage: number
  /** The number of max pages to display */
  maxElements?: number
  /** Paginate to the next page */
  onNextClick: () => void
  /** Paginate to the previous page */
  onPrevClick: () => void
  /** Paginate to the specified page */
  onPageClick: (page: number) => void
}

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  max-height: 2.4rem;
`

const NavigationButton = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #3f51b5;
  &:hover {
    filter: brightness(1.5);
  }
  &:active {
    filter: brightness(0.8);
  }
  &:disabled {
    filter: brightness(0.8);
    cursor: not-allowed;
  }
  transition: filter 0.1s linear;
`
const MovePrevButton = styled(NavigationButton)`
  margin-right: 0.4rem;
`

const MoveNextButton = styled(NavigationButton)`
  margin-left: 0.4rem;
`

const Dots = styled.span`
  margin: 0 0.4rem;
  margin-bottom: 2px;
  font-size: 1.6rem;
  letter-spacing: 0.1em;
`

const PageNumber = styled.span<{ current?: boolean }>`
  border-radius: 50%;
  border: solid 1px #707070;
  cursor: pointer;
  margin: 0 4px;
  width: 2.4rem;
  height: 2.4rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.current && 'background-color: #c0c0c0'};
  &:hover {
    background-color: #c0c0c0;
  }
  &:active {
    background-color: inherit;
  }
  transition: background-color 0.1s linear;
`

/** Gives the control to paginate between pages */
export default function Pagination({
  pages,
  currentPage,
  maxElements = 3,
  onPrevClick,
  onNextClick,
}: PaginationProps) {
  /** Renders the page numbers depending on the current page */
  const renderPageNumbers = (pages: number, currentPage: number) => {
    const pageSlice = Paginator.generateSlice(currentPage, pages, maxElements)

    return pageSlice.map((num) => (
      <PageNumber key={num} {...(num == currentPage && { current: true })}>
        {num}
      </PageNumber>
    ))
  }

  return (
    <PaginationContainer>
      <MovePrevButton
        aria-label="PreviousPage"
        onClick={onPrevClick}
        {...(currentPage == 1 && { disabled: true })}
      >
        <Icon name="chevron-circle-left" height={24} width={24} />
      </MovePrevButton>
      {pages > 3 && currentPage > 2 && <Dots>...</Dots>}

      {renderPageNumbers(pages, currentPage)}

      {pages > 3 && currentPage < pages - 1 && <Dots>...</Dots>}
      <MoveNextButton
        aria-label="NextPage"
        onClick={onNextClick}
        {...(currentPage == pages && { disabled: true })}
      >
        <Icon name="chevron-circle-right" height={24} width={24} />
      </MoveNextButton>
    </PaginationContainer>
  )
}
