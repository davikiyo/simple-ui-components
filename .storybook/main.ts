import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: [{
    directory: '../stories',
    titlePrefix: 'components',
    files: '**/*.stories.@(jsx|tsx)'
  }],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y', '@storybook/addon-mdx-gfm'],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true
  }
};

export default config
