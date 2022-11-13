import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Checkbox from './Checkbox'

describe('Checkbox component', () => {
  const onChangeMock = jest.fn()

  beforeEach(() => {
    onChangeMock.mockClear()
  })

  it('should render a button with text', () => {
    render(<Checkbox />)
    expect(screen.getByLabelText('checkbox')).toBeInTheDocument()
  })

  it('should trigger an event', async () => {
    render(<Checkbox onChange={onChangeMock} />)

    await userEvent.click(screen.getByLabelText('checkbox'))
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should trigger an event with enter', async () => {
    render(<Checkbox onChange={onChangeMock} />)

    const checkbox = screen.getByLabelText('checkbox')
    checkbox.focus()
    await userEvent.keyboard('{enter}')
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should trigger an event with space', async () => {
    render(<Checkbox onChange={onChangeMock} />)

    const checkbox = screen.getByLabelText('checkbox')
    checkbox.focus()
    await userEvent.keyboard(' ')
    expect(onChangeMock).toHaveBeenCalledTimes(1)
  })

  it('should switch the text when clicked', async () => {
    const checkedText = 'CHECKED'
    const unCheckedText = 'UNCHECKED'
    render(<Checkbox onChange={onChangeMock} iconChecked={checkedText} icon={unCheckedText} />)

    expect(screen.getByText(unCheckedText)).toBeInTheDocument()
    await userEvent.click(screen.getByLabelText('checkbox'))
    expect(await screen.findByText(checkedText)).toBeInTheDocument()
  })

  it('should not trigger an event when disabled', async () => {
    render(<Checkbox onChange={onChangeMock} disabled />)

    await userEvent.click(screen.getByLabelText('checkbox'))
    expect(onChangeMock).not.toHaveBeenCalled()
  })
})
