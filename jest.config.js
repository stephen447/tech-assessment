module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // No '/extend-expect' needed here
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // This tells Jest to use ts-jest for TS/TSX files
  },
};
