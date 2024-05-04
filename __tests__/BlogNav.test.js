// BlogNav.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to wrap the component with Router context
import BlogNav from '../src/component/BlogNav';
import { LoginContext } from '../src/context/LoginContext';
import Login from '../src/component/Login';
import '@testing-library/jest-dom'
// Mock the useContext hook for LoginContext
jest.mock('../src/component/Login', () => jest.fn(() => <div>MockedLogin</div>));
describe('BlogNav component', () => {
  test('renders BlogNav with correct links when logged in', () => {
    // Mock context values
    const contextValues = {
      isLogin: true,
      email: 'example@example.com',
      isAdmin: jest.fn().mockReturnValue(true), // Mock isAdmin function
    };

    // Render the BlogNav component with mocked context values
    render(
        <MemoryRouter>
            <LoginContext.Provider value={contextValues}>
                <BlogNav />
            </LoginContext.Provider>
        </MemoryRouter>
    );

    // Assert that the correct links are rendered
    expect(screen.getByText('Pancingan')).toBeInTheDocument();
    expect(screen.getByText('New Blog')).toBeInTheDocument();
    expect(screen.getByText('My Blog')).toBeInTheDocument();
    expect(screen.getByText('Unpublished Blog')).toBeInTheDocument();
    expect(Login).toHaveBeenCalled(); // Assuming the Login component renders a login link
  });

  test('renders BlogNav with correct links when not logged in', () => {
    // Mock context values
    const contextValues = {
      isLogin: false,
      email: '',
      isAdmin: jest.fn().mockReturnValue(false), // Mock isAdmin function
    };

    // Render the BlogNav component with mocked context values
    render(
      <MemoryRouter>
        <LoginContext.Provider value={contextValues}>
          <BlogNav />
        </LoginContext.Provider>
      </MemoryRouter>
    );

    // Assert that only the login link is rendered
    expect(screen.getByText('Pancingan')).toBeInTheDocument();
    expect(screen.queryByText('New Blog')).not.toBeInTheDocument();
    expect(screen.queryByText('My Blog')).not.toBeInTheDocument();
    expect(screen.queryByText('Unpublished Blog')).not.toBeInTheDocument();
    expect(Login).toHaveBeenCalled();
  });
});