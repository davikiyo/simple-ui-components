import { styled, ROOT_FONT_SIZE } from 'styles'

import { Icon } from 'components'
import Paginator from './Paginator'

export interface PaginationProps {
  /**
   * Defines a class for the container.
   */
  className?: string

  /**
   * Number of total pages.
   */
  pages: number

  /**
   * The current page number.
   */
  currentPage: number

  /**
   * The number of max pages to display.
   */
  maxElements?: number

  /**
   * Paginate to the next page.
   */
  onNextClick: () => void

  /**
   * Paginate to the previous page.
   */
  onPrevClick: () => void

  /**
   * Paginate to the specified page.
   *
   * @param page - A page number that has been clicked.
   */
  onPageClick: (page: number) => void
}

const BUTTON_SIZE = 32

const PaginationContainer = styled('div', {
  fontFamily: '$main',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  maxHeight: `${BUTTON_SIZE / ROOT_FONT_SIZE}rem`,
})

const NavigationButton = styled('button', {
  margin: 0,
  padding: 0,
  width: `${BUTTON_SIZE / ROOT_FONT_SIZE}rem`,
  height: `${BUTTON_SIZE / ROOT_FONT_SIZE}rem`,
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  border: 'none',
  color: '$indigo',
  '@bp3': {
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(1.5)',
    },
  },
  '&:active': {
    filter: 'brightness(0.8)',
  },
  '&:disabled': {
    filter: 'brightness(0.8)',
    cursor: 'not-allowed',
  },
  transition: 'filter 0.1s linear',
})

const MovePrevButton = styled(NavigationButton, {
  marginRight: `${8 / ROOT_FONT_SIZE}rem`,
})

const MoveNextButton = styled(NavigationButton, {
  marginLeft: `${8 / ROOT_FONT_SIZE}rem`,
})

const Dots = styled('span', {
  textAlign: 'center',
  width: '8px',
  mx: '$2',
  marginBottom: '2px',
  letterSpacing: '0.1em',
  variants: {
    show: {
      true: {
        borderBottom: '2px dotted #000',
      },
    },
  },
})

const PageNumber = styled('span', {
  boxSizing: 'border-box',
  borderRadius: '50%',
  border: 'solid 1px #707070',
  margin: `0 $2`,
  width: `${BUTTON_SIZE / ROOT_FONT_SIZE}rem`,
  height: `${BUTTON_SIZE / ROOT_FONT_SIZE}rem`,
  fontSize: `$md`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@bp3': {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#c0c0c0',
    },
  },
  '&:active': {
    backgroundColor: '#f0f0f0',
  },
  transition: 'background-color 0.1s linear',
  variants: {
    current: {
      true: {
        backgroundColor: '#c0c0c0',
        '&:active': {
          backgroundColor: '#c0c0c0',
        },
      },
    },
  },
})

/**
 * gives the control to paginate between pages.
 */
export default function Pagination({
  className,
  pages,
  currentPage,
  maxElements = 3,
  onPrevClick,
  onNextClick,
  onPageClick,
}: PaginationProps) {
  const onClickHandler = (num: number) => {
    if (num !== currentPage) onPageClick(num)
  }
  // Renders the page numbers depending on the current page
  const renderPageNumbers = (pages: number, currentPage: number) => {
    const pageSlice = Paginator.generateSlice(currentPage, pages, maxElements)

    return (
      <>
        <Dots show={!pageSlice.includes(1)} />
        {pageSlice.map((num) => (
          <PageNumber
            key={num}
            onClick={() => onClickHandler(num)}
            {...(num == currentPage && { current: true })}
          >
            {num}
          </PageNumber>
        ))}
        <Dots show={!pageSlice.includes(pages)} />
      </>
    )
  }

  return (
    <PaginationContainer className={className}>
      <MovePrevButton
        aria-label="PreviousPage"
        onClick={onPrevClick}
        {...(currentPage <= 1 && { disabled: true })}
      >
        <Icon name="chevron-circle-left" height={BUTTON_SIZE} width={BUTTON_SIZE} />
      </MovePrevButton>
      {renderPageNumbers(pages, currentPage)}
      <MoveNextButton
        aria-label="NextPage"
        onClick={onNextClick}
        {...(currentPage >= pages && { disabled: true })}
      >
        <Icon name="chevron-circle-right" height={BUTTON_SIZE} width={BUTTON_SIZE} />
      </MoveNextButton>
    </PaginationContainer>
  )
}
