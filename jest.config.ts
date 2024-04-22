module.exports = {
  // ... other Jest configurations
  // collectCoverage: true,
  //   collectCoverageFrom: [
  //     '**/*.service.ts',
  //     '!**/*.spec.ts', // Exclude test files
  //   ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  roots: ['./'],
  modulePaths: ['<rootDir>/'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // coverageDirectory: '../coverage',
  testEnvironment: 'node',
  testSequencer: './testSequencer.js',
};
