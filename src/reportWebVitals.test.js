import reportWebVitals from './reportWebVitals';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Mock the web-vitals module
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn()
}));

describe('reportWebVitals', () => {
  test('calls web-vitals functions when valid function is passed', () => {
    const mockFn = jest.fn();
    
    // Call the function
    reportWebVitals(mockFn);

    // Verify that each web-vitals function was called with mockFn
    expect(getCLS).toHaveBeenCalledWith(mockFn);
    expect(getFID).toHaveBeenCalledWith(mockFn);
    expect(getFCP).toHaveBeenCalledWith(mockFn);
    expect(getLCP).toHaveBeenCalledWith(mockFn);
    expect(getTTFB).toHaveBeenCalledWith(mockFn);
  });
});