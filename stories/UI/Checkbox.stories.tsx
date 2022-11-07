import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Checkbox, Icon } from 'components'

export default {
  component: Checkbox,
  argTypes: {
    icon: {
      control: false,
    },
    iconChecked: {
      control: false,
    },
  },
} as ComponentMeta<typeof Checkbox>

export const Unchecked: ComponentStoryObj<typeof Checkbox> = {
  args: {
    name: 'TestCheckbox',
  },
}

export const Checked: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Unchecked.args,
    checked: true,
  },
}

export const DisabledUnchecked: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Unchecked.args,
    disabled: true,
  },
}

export const DisabledChecked: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Unchecked.args,
    checked: true,
    disabled: true,
  },
}

export const CustomIcon: ComponentStoryObj<typeof Checkbox> = {
  args: {
    ...Unchecked.args,
    icon: <Icon name="star-outlined" height={32} width={32} color="#c0c0c0" />,
    iconChecked: <Icon name="star-filled" height={32} width={32} color="#FFC95E" />,
  },
}
