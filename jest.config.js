/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  setupFilesAfterEnv: ["jest-extended/all"],

  // The test environment that will be used for testing
  testEnvironment: "node",
};

module.exports = config;
