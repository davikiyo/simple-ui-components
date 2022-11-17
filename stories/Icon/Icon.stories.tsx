import { ComponentStoryObj, ComponentMeta } from '@storybook/react'

import { Icon } from 'components'
import { ICON_NAMES } from 'types/Icon'

export default {
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: ICON_NAMES,
    },
  },
} as ComponentMeta<typeof Icon>

export const Default: ComponentStoryObj<typeof Icon> = {
  args: {
    name: 'chevron-circle-left',
  },
}

export const Large: ComponentStoryObj<typeof Icon> = {
  args: {
    ...Default.args,
    width: 50,
    height: 50,
  },
}
