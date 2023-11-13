const fullCoverage = {
  statements: 100,
  branches: 100,
  functions: 100,
  lines: 100,
};

export default {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  testEnvironment: 'node',
  coverageThreshold: {
    global: fullCoverage,
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/lib',
    '<rootDir>/src/tests',
    '<rootDir>/node_modules/',
  ],
};
