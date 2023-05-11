import type { Preview } from '@storybook/react'
import { IconSprite } from 'components'

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <IconSprite />
        <Story />
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;