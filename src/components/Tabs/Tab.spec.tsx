import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tab from './Tab'

describe('Tab component', () => {
  const mockFn = jest.fn()
  let activeTab: string
  const tabs = ['1', '2', '3']

  beforeEach(() => {
    activeTab = tabs[0]
    mockFn.mockClear()
  })

  const initialize = () => render(<Tab activeTab={activeTab} tabs={tabs} onClick={mockFn} />)
  it('should display tabs', () => {
    initialize()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    tabs.forEach((tab) => expect(screen.getByRole('tab', { name: tab })).toBeInTheDocument())
  })

  it('should fire event when clicked the tab button', async () => {
    initialize()
    await userEvent.click(screen.getByRole('tab', { name: tabs[1] }))
    expect(mockFn).toBeCalledWith(tabs[1])
  })

  it('should disable the active tab.', () => {
    const { rerender } = initialize()
    tabs.forEach((tab) => {
      activeTab = tab
      rerender(<Tab activeTab={activeTab} tabs={tabs} onClick={mockFn} />)
      expect(screen.getByRole('tab', { name: tab })).toBeDisabled()
    })
  })
})
