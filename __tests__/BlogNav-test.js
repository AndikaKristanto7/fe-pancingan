import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for testing routing components
import BlogNav from '../src/component/BlogNav';
import { LoginContext } from '../src/context/LoginContext';
jest.mock('../src/component/Login')

describe('BlogNav component', () => {
  const mockContextValue = {
    email: '',
    name: '',
    id: '',
    handleData: jest.fn(),
  };
  it('Render Blog Nav', () => {
    // Render the BlogNav component within a Router
    const { getByText } = render(
      <LoginContext.Provider value={mockContextValue}>
        <Router>
          <BlogNav />
        </Router>
      </LoginContext.Provider>
    );

    // Assert that the Navbar brand text is rendered
    expect(getByText('Pancingan')).toBeInTheDocument();

    // Assert that the "New Blog" link is rendered
    expect(getByText('New Blog')).toBeInTheDocument();
  
  });
});