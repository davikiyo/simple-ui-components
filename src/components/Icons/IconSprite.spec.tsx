import { render } from '@testing-library/react'
import IconSprite from './IconSprite'

describe('<IconSprite />', () => {
  it('should render an svg element', () => {
    const { container } = render(<IconSprite />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
