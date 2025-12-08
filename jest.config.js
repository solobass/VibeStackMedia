/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { 
      tsconfig: {
        jsx: "react-jsx",
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      }
    }],
  },
  preset: "ts-jest",
  moduleNameMapper: {
    // Handle imports like @/components/...
    "^@/(.*)$": "<rootDir>/$1",
    // Ignore styles/images in tests
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!(next|@next)/)",
  ],
};

module.exports = config;

