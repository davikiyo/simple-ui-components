const { mergeConfig, loadConfigFromFile } = require('vite')
const path = require('path')

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  stories: [
    {
      directory: '../stories',
      titlePrefix: 'components',
      files: '**/*.stories.@(jsx|tsx)'
    }
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  async viteFinal(config) {
    const { config: viteConfig } = await loadConfigFromFile(path.resolve(__dirname, '../vite.config.js'))
    return mergeConfig(config, {
      resolve: {
        alias: {
          ...viteConfig.resolve.alias,
        },
      },
    })
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
