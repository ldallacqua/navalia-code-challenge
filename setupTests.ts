import '@testing-library/jest-dom'

beforeAll(() => {
  if (typeof window !== 'undefined') {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          media: '',
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }
      }
  }
})
