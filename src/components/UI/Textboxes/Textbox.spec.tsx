import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Textbox from './Textbox'

describe('Textbox component', () => {
  const onChangeMock = jest.fn()

  beforeEach(() => {
    onChangeMock.mockClear()
  })

  it('should render a textbox with a text', () => {
    render(<Textbox onChange={onChangeMock} value="TEST" />)
    expect(screen.getByRole('textbox')).toHaveValue('TEST')
  })

  it('should render a textbox with a label', () => {
    render(<Textbox label="TEST" />)
    expect(screen.getByLabelText('TEST')).toBeInTheDocument()
  })

  it('should trigger an event when typed a word', async () => {
    render(<Textbox onChange={onChangeMock} />)
    await userEvent.type(screen.getByRole('textbox'), 'TEST')
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should not trigger an event when disabled', async () => {
    render(<Textbox onChange={onChangeMock} disabled />)
    await userEvent.type(screen.getByRole('textbox'), 'TEST')
    expect(onChangeMock).not.toHaveBeenCalled()
  })

  it('should render a textbox with an error message', () => {
    render(<Textbox error="ERROR" />)
    expect(screen.getByText('ERROR')).toBeInTheDocument()
  })
})
