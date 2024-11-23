// jest-dom adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Mock console error for cleaner test output
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/ReactDOM.render is no longer supported in React 18/.test(args[0])) {
      return;
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Add any other global configurations or mocks