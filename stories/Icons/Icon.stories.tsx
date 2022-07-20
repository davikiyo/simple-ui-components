import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon, IconProps } from 'components'

export default {
  title: 'Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args: IconProps) => <Icon {...args} />

export const ChevronLeftCircle = Template.bind({})
ChevronLeftCircle.args = {
  width: 32,
  height: 32,
  name: 'chevron-circle-left',
}
