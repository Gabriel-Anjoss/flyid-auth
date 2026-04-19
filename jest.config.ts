import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
    '**/*.{spec,test}.{ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig.test.json',
    }],
  },
  moduleDirectories: ['node_modules', 'src'],
};

export default config;