const { mergeConfig } = require('vite')
const path = require('path')
module.exports = {
  stories: [
    {
      directory: '../stories/**/',
      titlePrefix: 'Components',
      files: '*.stories.@(js|jsx|ts|tsx)',
    },
  ],
  staticDirs: ['./public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  async viteFinal(config, _options) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          components: path.resolve(__dirname, '../src/index.ts'),
          assets: path.resolve(__dirname, '../src/assets'),
          styles: path.resolve(__dirname, '../src/styles/index.ts')
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
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
