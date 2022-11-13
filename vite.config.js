import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      tsConfigFilePath: './tsconfig.prod.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SimpleUIComponents',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'classnames', '@stitches/react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          classnames: 'cx',
          '@stitches/react': 'stitches',
        },
      },
    },
    outDir: 'lib',
  },
  resolve: {
    alias: {
      components: resolve(__dirname, 'src/index.ts'),
      styles: resolve(__dirname, 'src/styles/index.ts'),
      assets: resolve(__dirname, 'src/assets'),
      utils: resolve(__dirname, 'src/utils'),
      types: resolve(__dirname, 'src/types'),
    },
  },
})
