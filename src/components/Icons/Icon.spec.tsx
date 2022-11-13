import { render } from '@testing-library/react'

import Icon from './Icon'

describe('Icon component', () => {
  it('should render a selected icon', () => {
    const { container } = render(<Icon height={16} width={16} name="chevron-circle-right" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
