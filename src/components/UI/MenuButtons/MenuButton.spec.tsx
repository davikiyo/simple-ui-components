import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MenuButton from './MenuButton'

describe('MenuButton component', () => {
  const onClickMock = jest.fn()

  let props = {
    active: false,
    small: false,
    disabled: false,
    onClick: onClickMock,
  }

  beforeEach(() => {
    onClickMock.mockClear()
    props = {
      active: false,
      small: false,
      disabled: false,
      onClick: onClickMock,
    }
  })

  const initialize = () => render(<MenuButton {...props}>TEST</MenuButton>)

  it('should display a menu button with label', () => {
    initialize()
    expect(screen.getByRole('button', { name: 'TEST' })).toBeInTheDocument()
  })

  it('should trigger a onClick event when clicked', async () => {
    initialize()
    await userEvent.click(screen.getByRole('button', { name: 'TEST' }))
    expect(onClickMock).toBeCalledTimes(1)
  })

  it('should trigger a onClick event when active', async () => {
    props.active = true
    initialize()
    await userEvent.click(screen.getByRole('button', { name: 'TEST' }))
    expect(onClickMock).toBeCalledTimes(0)
  })

  it('should trigger a onClick event when disabled', async () => {
    props.disabled = true
    initialize()
    await userEvent.click(screen.getByRole('button', { name: 'TEST' }))
    expect(onClickMock).toBeCalledTimes(0)
  })
})
