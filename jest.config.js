module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!wouter).+\\.js$", // Add exceptions for libraries using ESM
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
};
