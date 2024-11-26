const config = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  testEnvironment: 'jsdom'
};

export default config;
