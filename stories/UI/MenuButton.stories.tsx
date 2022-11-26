import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { MenuButton } from 'components'

export default {
  component: MenuButton,
} as ComponentMeta<typeof MenuButton>

export const Normal: ComponentStoryObj<typeof MenuButton> = {
  args: {
    children: 'TEST',
  },
}

export const Active: ComponentStoryObj<typeof MenuButton> = {
  args: {
    ...Normal.args,
    active: true,
  },
}

export const Small: ComponentStoryObj<typeof MenuButton> = {
  args: {
    ...Normal.args,
    small: true,
  },
}
