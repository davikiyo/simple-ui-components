import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Drawer from './Drawer'

describe('Drawer component', () => {
  let show = true
  let persist = false
  const onCloseMock = jest.fn()
  window.scrollTo = jest.fn()

  beforeEach(() => {
    show = true
    persist = false
    onCloseMock.mockClear()
  })
  const initialize = () =>
    render(
      <Drawer show={show} persist={persist} onClose={onCloseMock}>
        TEST
      </Drawer>
    )

  it('should display a drawer with a backdrop', () => {
    initialize()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('backdrop-dark')).toBeInTheDocument()
  })

  it('should display a drawer without a backdrop when it is persisted', () => {
    persist = true
    initialize()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.queryByTestId('backdrop-dark')).toBeNull()
  })

  it('should not display a drawer when false', () => {
    show = false
    initialize()
    expect(screen.getByRole('navigation')).toHaveClass('hidden')
  })

  it('should trigger onClose event when clicked away', async () => {
    initialize()
    await userEvent.click(screen.getByTestId('backdrop-dark'))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
