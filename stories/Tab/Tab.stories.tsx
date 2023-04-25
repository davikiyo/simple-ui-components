import { Meta, StoryObj } from '@storybook/react'
import { Tab } from 'components'
import { useState } from 'react'

const meta: Meta<typeof Tab> = {
  component: Tab,
}

export default meta

type Story = StoryObj<typeof Tab>

export const Default: Story = {
  args: {
    tabs: ['1', '2', '3'],
    activeTab: '1',
  },
}

export const Controlled: Story = {
  args: {
    tabs: ['1', '2', '3'],
    activeTab: '1',
  },
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab)

    return <Tab activeTab={activeTab} tabs={args.tabs} onClick={(tab) => setActiveTab(tab)} />
  },
}
