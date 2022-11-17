import { screen, render } from '@testing-library/react'

import Icon from './Icon'

describe('Icon component', () => {
  it('should render an icon', () => {
    render(<Icon name="chevron-circle-right" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
