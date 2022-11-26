import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Button } from 'components'

export default {
  component: Button,
} as ComponentMeta<typeof Button>

export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Button',
    css: {
      width: 258,
    },
  },
}

export const Disabled: ComponentStoryObj<typeof Button> = {
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const Rounded: ComponentStoryObj<typeof Button> = {
  args: {
    ...Default.args,
    rounded: true,
  },
}

export const Outlined: ComponentStoryObj<typeof Button> = {
  args: {
    ...Default.args,
    outlined: true,
  },
}
