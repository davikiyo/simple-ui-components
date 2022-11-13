import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Pagination from './Pagination'

describe('Pagination component', () => {
  const onNextClickMock = jest.fn()
  const onPrevClickMock = jest.fn()
  const onPageClickMock = jest.fn()
  let pages = 5
  let currentPage = 1
  const props = {
    onNextClick: onNextClickMock,
    onPrevClick: onPrevClickMock,
    onPageClick: onPageClickMock,
  }

  beforeEach(() => {
    pages = 5
    currentPage = 1
    onNextClickMock.mockClear()
    onPrevClickMock.mockClear()
    onPageClickMock.mockClear()
  })

  const initialize = () => render(<Pagination currentPage={currentPage} pages={pages} {...props} />)

  it('should render a pagination with 3 pages', () => {
    initialize()

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('should trigger an event when clicked on the next button', async () => {
    initialize()

    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onNextClickMock).toHaveBeenCalled()
  })

  it('should not trigger an event when clicked on the next button and current page is 5', async () => {
    currentPage = 5
    initialize()

    await userEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(onNextClickMock).not.toHaveBeenCalled()
  })

  it('should trigger an event when clicked on the prev button', async () => {
    currentPage = 2
    initialize()

    await userEvent.click(screen.getByRole('button', { name: /prev/i }))
    expect(onPrevClickMock).toHaveBeenCalled()
  })

  it('should not trigger an event when clicked on the prev button and current page is 1', async () => {
    initialize()

    await userEvent.click(screen.getByRole('button', { name: /prev/i }))
    expect(onPrevClickMock).not.toHaveBeenCalled()
  })

  it('should trigger an event with a number when clicked on the page button', async () => {
    initialize()

    await userEvent.click(screen.getByText('2'))
    expect(onPageClickMock).toHaveBeenCalledWith(2)
  })
})
