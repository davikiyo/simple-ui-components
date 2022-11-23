import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { IconButton } from 'components'

export default {
  component: IconButton,
} as ComponentMeta<typeof IconButton>

export const Normal: ComponentStoryObj<typeof IconButton> = {
  args: {
    icon: 'arrow-left',
  },
}

export const Rounded: ComponentStoryObj<typeof IconButton> = {
  args: {
    icon: 'arrow-left',
    rounded: true,
  },
}
