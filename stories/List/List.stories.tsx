import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { List, ListItem, MenuButton } from 'components'

export default {
  component: List,
  render: (args) => {
    return (
      <div style={{ width: '240px' }}>
        <List {...args}>{args.children}</List>
      </div>
    )
  },
} as ComponentMeta<typeof List>

export const Default: ComponentStoryObj<typeof List> = {
  args: {
    children: (
      <>
        <ListItem>TEST1</ListItem>
        <ListItem>TEST2</ListItem>
      </>
    ),
  },
}

export const Bordered: ComponentStoryObj<typeof List> = {
  args: {
    ...Default.args,
    border: true,
  },
}

export const WithButton: ComponentStoryObj<typeof List> = {
  args: {
    border: true,
    padding: 'none',
    children: (
      <>
        <ListItem>
          <MenuButton active>TEST1</MenuButton>
        </ListItem>
        <ListItem>
          <MenuButton>TEST2</MenuButton>
        </ListItem>
      </>
    ),
  },
}
