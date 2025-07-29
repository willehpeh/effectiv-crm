export default {
  displayName: 'tests-integration',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/tests-integration',
  testMatch: ['**/*.integration.spec.ts'],
  // Integration tests may take longer - configured in setupFilesAfterEnv if needed
};
