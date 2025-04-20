export default {
    testEnvironment: "node",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    testMatch: [
      "**/src/__tests__/**/*.[jt]s?(x)",
      "**/src/?(*.)+(spec|test).[tj]s?(x)",
    ],
  };