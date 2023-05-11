import { styled } from 'styles'

export interface TabProps<T> {
  /**
   * Defines a class for the tab's container.
   */
  className?: string

  /**
   * The active tab.
   */
  activeTab: T

  /**
   * Defines the tabs to be displayed.
   */
  tabs: T[]

  /**
   * Handles the click event.
   * @param tab - The element value.
   */
  onClick: (tab: T) => void
}

const Container = styled('div', {
  display: 'inline-block',
  alignItems: 'center',
  justifyContent: 'center',
})

const TabButton = styled('button', {
  minWidth: '4.6875rem',
  minHeight: '1.875rem',
  backgroundColor: '#fff',
  border: 'solid 1px $lightGraySecondary',
  cursor: 'pointer',
  color: '#000',
  '&:disabled': {
    backgroundColor: '$lightGraySecondary',
    color: 'inherit',
    cursor: 'default',
  },
  '&:focus-visible': {
    outline: 'auto',
  },
  '&:first-of-type': {
    borderRadius: '20px 0 0 20px',
  },
  '&:last-of-type': {
    borderRadius: '0 20px 20px 0',
  },
  '&:not(:last-of-type)': {
    marginRight: -1,
  },
})

/**
 * displays styled tabs.
 */
export default function Tab<T extends string | number | boolean>({
  activeTab,
  className,
  onClick,
  tabs,
}: TabProps<T>) {
  return (
    <Container className={className} role="tablist">
      {tabs.map((name) => (
        <TabButton
          key={String(name)}
          type="button"
          role="tab"
          onClick={() => onClick(name)}
          disabled={name === activeTab}
        >
          {name}
        </TabButton>
      ))}
    </Container>
  )
}
