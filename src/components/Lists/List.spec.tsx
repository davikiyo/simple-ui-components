import { render, screen } from '@testing-library/react'
import List from './List'

describe('List component', () => {
  let border = false

  beforeEach(() => {
    border = false
  })
  const initialize = () =>
    render(
      <List aria-label="TEST" border={border}>
        <li>TEST1</li>
        <li>TEST2</li>
      </List>
    )

  it('should display a list', () => {
    initialize()
    expect(screen.getByRole('list', { name: 'TEST' })).toBeInTheDocument()
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })

  it('should display a list with borders', () => {
    border = true
    initialize()
    expect(screen.getByRole('list', { name: 'TEST' })).toBeInTheDocument()
  })
})
