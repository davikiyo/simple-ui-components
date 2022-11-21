import { screen, render, within } from '@testing-library/react'

import AppBar from './AppBar'

describe('AppBar component', () => {
  it('should render an AppBar component with title', () => {
    render(<AppBar>TEST</AppBar>)
    const appBar = screen.getByRole('toolbar')
    expect(within(appBar).getByText('TEST')).toBeInTheDocument()
  })
})
