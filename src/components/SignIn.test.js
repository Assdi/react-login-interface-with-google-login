import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './SignIn';

describe('SignIn Component', () => {
  test('renders sign in form elements', () => {
    render(<SignIn />);
    
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('signin-submit')).toBeInTheDocument();
    expect(screen.getByTestId('google-signin')).toBeInTheDocument();
  });

  test('buttons have correct text', () => {
    render(<SignIn />);
    
    expect(screen.getByTestId('signin-submit')).toHaveTextContent('Sign In');
    expect(screen.getByTestId('google-signin')).toHaveTextContent('Sign in with Google');
  });

  test('shows error for invalid email format', async () => {
    render(<SignIn />);
    
    const emailInput = screen.getByTestId('email-input').querySelector('input');
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        return element.textContent === 'Enter a valid email';
      });
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('shows error for invalid password format', async () => {
    render(<SignIn />);
    
    const passwordInput = screen.getByTestId('password-input').querySelector('input');
    await userEvent.type(passwordInput, 'short');
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      const errorMessage = screen.getByText((content, element) => {
        return element.textContent === 'Password should be of minimum 8 characters length';
      });
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('shows validation errors for empty fields', async () => {
    render(<SignIn />);
    
    const submitButton = screen.getByTestId('signin-submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText((content, element) => {
        return element.textContent === 'Email is required';
      });
      const passwordError = screen.getByText((content, element) => {
        return element.textContent === 'Password is required';
      });
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });
});

describe('Password Visibility Toggle', () => {
  test('toggles password visibility', async () => {
    render(<SignIn />);
    
    const passwordInput = screen.getByTestId('password-input').querySelector('input');
    const toggleButton = screen.getByTestId('password-visibility-toggle');
    
    expect(passwordInput.type).toBe('password');
    
    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});

describe('Loading State', () => {
  test('shows loading state during form submission', async () => {
    render(<SignIn />);
    
    const submitButton = screen.getByTestId('signin-submit');
    const emailInput = screen.getByTestId('email-input').querySelector('input');
    const passwordInput = screen.getByTestId('password-input').querySelector('input');
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123');
    
    await userEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    }, { timeout: 3000 });
  });
});

// Simple mock for Google OAuth
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: ({ onError, render }) => (
    <button 
      data-testid="google-signin"
      onClick={() => onError('Error occurred')}
    >
      Sign in with Google
    </button>
  )
}));

describe('Google Authentication', () => {
  test('shows error message when Google sign-in fails', async () => {
    render(<SignIn />);
    
    // Click the Google sign-in button
    const googleButton = screen.getByTestId('google-signin');
    fireEvent.click(googleButton);
    
    // Check for error message
    const errorMessage = await screen.findByText(/failed/i);
    expect(errorMessage).toBeInTheDocument();
  });
});