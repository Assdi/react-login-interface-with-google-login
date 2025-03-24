import reportWebVitals from './reportWebVitals';

// Mock reportWebVitals
jest.mock('./reportWebVitals', () => {
  return {
    __esModule: true,
    default: jest.fn()
  };
});

// Mock react-dom/client to prevent render errors
jest.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: () => {}
  })
}));

describe('Index', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
  });

  test('calls reportWebVitals', () => {
    // Import index.js to trigger its code
    require('./index.js');

    // Verify reportWebVitals was called
    expect(reportWebVitals).toHaveBeenCalled();
  });
}); 