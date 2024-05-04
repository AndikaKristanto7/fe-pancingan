// NewBlog.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import NewBlog from '../src/view/NewBlog';
import { LoginContext } from '../src/context/LoginContext';
import * as BeApp from '../src/helpers/api_call/BeApp';
import BlogNav from '../src/component/BlogNav';
import Footer from '../src/component/Footer';
import Uploader from '../src/component/Uploader';
jest.mock('../src/component/BlogNav', () => jest.fn(() => <div>MockedBlogNav</div>));
jest.mock('../src/component/Uploader', () => jest.fn(() => <div>MockedUploader</div>));
jest.mock('../src/component/Footer', () => jest.fn(() => <div>MockedFooter</div>));
// Mock BeApp module
jest.mock('../src/helpers/api_call/BeApp', () => ({
  postBlog: jest.fn().mockResolvedValue(),
}));

describe('NewBlog component', () => {
  test('renders correctly with mocked context', () => {
    // Mock context values
    const loginContextValue = {
      isLogin: true,
      email: 'example@example.com',
    };

    // Render the NewBlog component with mocked context values
    render(
      <MemoryRouter>
        <LoginContext.Provider value={loginContextValue}>
          <NewBlog />
        </LoginContext.Provider>
      </MemoryRouter>
    );

    // Assert that input fields and submit button are rendered
    // expect(screen.getByLabelText('Title Blog:')).toBeInTheDocument();
    // expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    // expect(screen.getByText('Location:')).toBeInTheDocument();
    // expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(BlogNav).toHaveBeenCalled();
    expect(Uploader).toHaveBeenCalled();
    expect(Footer).toHaveBeenCalled();
  });
});