import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { AppBar, IconButton } from 'components'

export default {
  component: AppBar,
} as ComponentMeta<typeof AppBar>

export const Default: ComponentStoryObj<typeof AppBar> = {
  args: {
    children: (
      <>
        <IconButton icon="menu" height={24} width={24} rounded />
        <h1
          style={{
            fontFamily: 'roboto',
            marginLeft: '16px',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'normal',
          }}
        >
          TEST
        </h1>
      </>
    ),
  },
}

export const Small: ComponentStoryObj<typeof AppBar> = {
  args: {
    ...Default.args,
    small: true,
  },
}
