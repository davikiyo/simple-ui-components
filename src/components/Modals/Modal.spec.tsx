import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Modal from './Modal'

describe('Modal component', () => {
  let show = true
  const onCloseMock = jest.fn()

  beforeEach(() => {
    show = true
    onCloseMock.mockClear()
  })

  const initialize = () => render(<Modal show={show} onClose={onCloseMock} />)

  it('should display a modal with a backdrop when true', () => {
    initialize()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('backdrop-dark')).toBeInTheDocument()
  })

  it('should not display a modal when false', () => {
    show = false
    initialize()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('should trigger the onClose handler when clicked the backdrop', async () => {
    initialize()
    await userEvent.click(screen.getByTestId('backdrop-dark'))
    expect(onCloseMock).toBeCalledTimes(1)
  })
})
