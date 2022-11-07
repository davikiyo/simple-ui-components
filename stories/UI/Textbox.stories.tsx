import { useState } from 'react'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Textbox } from 'components'

export default {
  component: Textbox,
} as ComponentMeta<typeof Textbox>

export const Default: ComponentStoryObj<typeof Textbox> = {
  args: {
    onChange: undefined,
  },
}

export const Placeholder: ComponentStoryObj<typeof Textbox> = {
  args: {
    ...Default.args,
    placeholder: 'Placeholder',
  },
}

export const Labeled: ComponentStoryObj<typeof Textbox> = {
  args: {
    ...Default.args,
    label: 'Label',
  },
}

export const ControlledInput: ComponentStoryObj<typeof Textbox> = {
  args: {
    ...Default.args,
    label: 'Controlled Input',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState('Controlled')
    const handleChange = (value: string) => {
      setValue(value)
    }

    return <Textbox {...args} onChange={handleChange} value={value} />
  },
}

export const WithError: ComponentStoryObj<typeof Textbox> = {
  args: {
    ...Default.args,
    label: 'Input with an error',
    error: true,
  },
}

export const WithErrorMessage: ComponentStoryObj<typeof Textbox> = {
  args: {
    ...Default.args,
    label: 'Input with an error',
    error: 'You entered an incorrect value.',
  },
}
