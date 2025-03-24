import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    // Check for the Sign In heading which is part of the SignIn component
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    // Check if the container div exists
    expect(container.getElementsByClassName('App')).toHaveLength(1);
  });
});
