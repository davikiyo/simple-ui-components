import { FC } from 'react'
import { IconSprite } from 'components'

export const decorators = [
  (Story: FC) => (
    <>
      <IconSprite />
      <Story />
    </>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
