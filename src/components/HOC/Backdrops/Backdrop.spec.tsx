import { render, screen } from '@testing-library/react'

import withBackDrop, { BackdropProps } from './Backdrop'

const TestComponent = ({ show = false }: BackdropProps) => (show ? <div>TEST</div> : null)

let WrappedComponent = withBackDrop(TestComponent)

beforeEach(() => {
  WrappedComponent = withBackDrop(TestComponent)
})

describe('Backdrop HOC', () => {
  it('should not display a text by default', () => {
    render(<WrappedComponent />)
    expect(screen.queryByText('TEST')).toBeNull()
  })

  it('should display a text with a dark backdrop', () => {
    const { asFragment } = render(<WrappedComponent show />)
    expect(screen.getByText('TEST')).toBeInTheDocument()
    expect(screen.getByTestId('backdrop-dark')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should display a text with a light backdrop', () => {
    WrappedComponent = withBackDrop(TestComponent, { color: 'light' })
    const { asFragment } = render(<WrappedComponent show />)
    expect(screen.getByTestId('backdrop-light')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should fix the content', () => {
    WrappedComponent = withBackDrop(TestComponent, { fixContent: true })
    render(<WrappedComponent show />)
    expect(document.body.style.overflow).toBe('hidden')
  })
})
