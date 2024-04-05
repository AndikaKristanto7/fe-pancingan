module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mjs$': 'jest-esm-transformer'
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__tests__/styleMock.js', // Mock CSS files
  },
  testEnvironment: 'jsdom'
};