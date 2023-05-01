import { ChangeEvent, useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Textbox } from 'components'

const meta: Meta<typeof Textbox> = {
  component: Textbox,
}

export default meta

type Story = StoryObj<typeof Textbox>

export const Default: Story = {
  args: {
    onChange: undefined,
    name: 'test',
  },
}

export const Placeholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Placeholder',
  },
}

export const Labeled: Story = {
  args: {
    ...Default.args,
    label: 'Label',
  },
}

export const ControlledInput: Story = {
  args: {
    ...Default.args,
    label: 'Controlled Input',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState('Controlled')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    return <Textbox {...args} onChange={handleChange} value={value} />
  },
}

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    label: 'Input With Default Value',
    defaultValue: 'Default Value',
  },
}

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Input with an error',
    error: true,
  },
}

export const WithErrorMessage: Story = {
  args: {
    ...Default.args,
    label: 'Input with an error',
    error: 'You entered an incorrect value.',
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled Input',
    disabled: true,
    value: 'Disabled',
  },
}
