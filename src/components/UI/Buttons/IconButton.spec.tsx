import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IconButton from './IconButton'

describe('IconButton component', () => {
  it('should render a button with icon', () => {
    render(<IconButton icon="arrow-left" />)
    const button = screen.getByRole('button')
    expect(within(button).getByRole('img')).toBeInTheDocument()
  })

  it('should trigger an event', async () => {
    const onClickMock = jest.fn()
    render(<IconButton icon="arrow-left" onClick={onClickMock} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should not trigger an event when disabled', async () => {
    const onClickMock = jest.fn()
    render(<IconButton icon="arrow-left" onClick={onClickMock} disabled />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClickMock).not.toHaveBeenCalled()
  })
})
