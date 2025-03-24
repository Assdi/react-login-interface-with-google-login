import React from 'react';
import { render, screen } from '@testing-library/react';
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
});