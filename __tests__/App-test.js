import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { LoginContext } from '../src/context/LoginContext';
import PostContextProvider from '../src/context/postContext';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock('../src/component/Login')
describe('App component', () => {
    const mockContextValue = {
        email: '',
        name: '',
        id: '',
        handleData: jest.fn(),
    };
    const mockData = [
        {
          title: 'Mock Post',
          image: 'mock-image-url',
          description: 'Mock post description',
          slug: 'mock-post-slug',
        },
      ];
  it('renders App', () => {
    // Render the App component
    const { getByText } = render(
        <LoginContext.Provider value={mockContextValue}>
            <Router>
                <App />
            </Router>
        </LoginContext.Provider>
    );
    
    // Assert that BlogNav, Home, and Footer components are rendered
    expect(getByText('Pancingan')).toBeInTheDocument(); // Assuming 'Pancingan' is rendered by BlogNav
    expect(getByText('© 2024 Pancingan, Inc')).toBeInTheDocument(); // Assuming 'Footer content' is rendered by Footer
    // You can also add more specific assertions based on your components
  });
});