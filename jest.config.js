module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "node",
  moduleDirectories: ['node_modules'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
