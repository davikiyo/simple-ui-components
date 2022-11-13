import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon, IconProps } from 'components'
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

const Template: ComponentStory<typeof Icon> = (args: IconProps) => <Icon {...args} />

export const ChevronLeftCircle = Template.bind({})
ChevronLeftCircle.args = {
  width: 32,
  height: 32,
  name: 'chevron-circle-left',
}
