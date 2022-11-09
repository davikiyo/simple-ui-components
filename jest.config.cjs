/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', './stories', '/.storybook/', './lib'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.d.ts',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
