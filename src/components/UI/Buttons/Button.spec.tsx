import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'

describe('Button component', () => {
  it('should render a button with text', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByRole('button', { name: 'TEST' })).toBeInTheDocument()
  })

  it('should trigger an event', async () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>TEST</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'TEST' }))
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should not trigger an event when disabled', async () => {
    const onClickMock = jest.fn()
    render(
      <Button onClick={onClickMock} disabled>
        TEST
      </Button>
    )
    await userEvent.click(screen.getByRole('button', { name: 'TEST' }))
    expect(onClickMock).not.toHaveBeenCalled()
  })
})
