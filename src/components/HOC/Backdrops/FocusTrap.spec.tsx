import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FocusTrap from './FocusTrap'

describe('FocusTrap', () => {
  let children: JSX.Element

  beforeEach(() => {
    children = (
      <>
        <button data-testid="focusable-1">Focusable1</button>
        <button data-testid="focusable-2">Focusable2</button>
      </>
    )
  })

  const initialize = () =>
    render(
      <>
        <button data-testid="not-focusable">Not Focusable</button>
        <FocusTrap>{children}</FocusTrap>
      </>
    )
  it('should only focus on the wrapped children', async () => {
    initialize()

    await userEvent.tab()
    expect(screen.getByTestId('focusable-1')).toHaveFocus()

    await userEvent.tab()
    expect(screen.getByTestId('focusable-2')).toHaveFocus()

    await userEvent.tab()
    expect(screen.getByTestId('not-focusable')).not.toHaveFocus()
  })

  it('should not focus on any element out side the trap when there is no child', async () => {
    children = <h3>TEST</h3>
    initialize()

    await userEvent.tab()
    expect(screen.getByTestId('not-focusable')).not.toHaveFocus()

    await userEvent.tab({ shift: true })
    expect(screen.getByTestId('not-focusable')).not.toHaveFocus()
  })
})
