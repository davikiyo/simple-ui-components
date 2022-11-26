import { render, screen, within } from '@testing-library/react'

import ListItem from './ListItem'

describe('ListItem component', () => {
  const initialize = () =>
    render(
      <ul aria-label="TEST">
        <ListItem>TEST1</ListItem>
        <ListItem>TEST2</ListItem>
      </ul>
    )

  it('should display a list item', () => {
    initialize()
    const list = screen.getByRole('list', { name: 'TEST' })
    const listItems = within(list).getAllByRole('listitem')
    expect(listItems).toHaveLength(2)
  })
})
