import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Switch from './Switch'

describe('Switch component', () => {
  const onClickMock = jest.fn()
  beforeEach(() => {
    onClickMock.mockClear()
  })
  const initialize = () => render(<Switch onChange={onClickMock} />)
  it('should display a switch', () => {
    initialize()
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('should trigger a click event when clicking', async () => {
    initialize()
    await userEvent.click(screen.getByRole('switch'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
