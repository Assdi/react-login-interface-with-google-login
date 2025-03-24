import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from './SignIn';

describe('SignIn Component', () => {
  test('renders sign in form elements', () => {
    render(<SignIn />);
    
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
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