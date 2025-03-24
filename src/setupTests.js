import '@testing-library/jest-dom';

// Mock web-vitals module
jest.mock('web-vitals', () => ({
  getCLS: (fn) => fn({ id: 'CLS', value: 0 }),
  getFID: (fn) => fn({ id: 'FID', value: 0 }),
  getFCP: (fn) => fn({ id: 'FCP', value: 0 }),
  getLCP: (fn) => fn({ id: 'LCP', value: 0 }),
  getTTFB: (fn) => fn({ id: 'TTFB', value: 0 })
}));