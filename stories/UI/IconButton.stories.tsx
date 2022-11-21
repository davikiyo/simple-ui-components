import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { IconButton } from 'components'
import { ICON_NAMES } from 'types/Icon'

export default {
  component: IconButton,
  argTypes: {
    icon: {
      control: 'select',
      options: ICON_NAMES,
    },
  },
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
