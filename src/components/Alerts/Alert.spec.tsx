import { render, screen, within } from '@testing-library/react'
import Alert, { ALERT_VARIANTS } from './Alert'

describe('Alert component', () => {
  it.each<ALERT_VARIANTS>(['error', 'success', 'info', 'warning'])(
    'should display alert for %s',
    (variant) => {
      render(<Alert variant={variant}>TEST</Alert>)
      expect(screen.getByRole('alert').className).toContain(`variant-${variant}`)
    }
  )

  it('should not render an icon', () => {
    render(
      <Alert variant="error" icon={false}>
        TEST
      </Alert>
    )
    expect(within(screen.getByRole('alert')).queryByRole('img')).not.toBeInTheDocument()
  })

  it('should render an action button', () => {
    render(
      <Alert variant="error" action={<button type="button">TEST</button>}>
        TEST
      </Alert>
    )
    expect(within(screen.getByRole('alert')).getByRole('button')).toBeInTheDocument()
  })
})
