import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.integration.spec.ts'],
    rules: {
      '@nx/enforce-module-boundaries': 'off'
    }
  }
];
