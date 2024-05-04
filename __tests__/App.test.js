// App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import BlogNav from '../src/component/BlogNav';
import Home from '../src/view/Home';
import Footer from '../src/component/Footer';

// Mocking BlogNav, Home, and Footer components
jest.mock('../src/component/BlogNav', () => jest.fn(() => <div>MockedBlogNav</div>));
jest.mock('../src/view/Home', () => jest.fn(() => <div>MockedHome</div>));
jest.mock('../src/component/Footer', () => jest.fn(() => <div>MockedFooter</div>));

describe('App component', () => {
  test('renders BlogNav, Home, and Footer components', () => {
    // Render the App component with mocked components
    render(
        <App />
    );

    // Assert that BlogNav, Home, and Footer components are rendered
    expect(BlogNav).toHaveBeenCalled();
    expect(Home).toHaveBeenCalled();
    expect(Footer).toHaveBeenCalled();
  });
});