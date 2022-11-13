import { render, screen } from '@testing-library/react'

import Card from './Card'

describe('Card component', () => {
  it('should render a card with text', () => {
    render(<Card>TEST</Card>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
})
