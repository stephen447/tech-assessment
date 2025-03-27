import "@testing-library/jest-dom";
global.fetch = require("node-fetch");
global.fetch = fetch;
global.matchMedia =
  global.matchMedia ||
  (() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
