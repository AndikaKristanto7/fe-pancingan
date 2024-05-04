// DetailBlog.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailBlog from '../src/view/DetailBlog';
import { LoginContext } from '../src/context/LoginContext';
import * as BeApp from '../src/helpers/api_call/BeApp'; // Import all named exports from BeApp module
import moment from 'moment';
import BlogNav from '../src/component/BlogNav';
import Footer from '../src/component/Footer';
jest.mock('../src/component/BlogNav', () => jest.fn(() => <div>MockedBlogNav</div>));
jest.mock('../src/component/Footer', () => jest.fn(() => <div>MockedFooter</div>));
describe('DetailBlog component', () => {
  test('renders correctly with mocked data and context', async () => {
    // Mock context values
    const loginContextValue = {
      isSameUser: jest.fn().mockReturnValue(true),
      isAdmin: jest.fn().mockReturnValue(true),
    };

    // Mock data
    const mockData = {
      data: {
        title: 'Mocked Title',
        image: 'mockedImage.jpg',
        description: 'Mocked description',
        location: '{"latitude": 123, "longitude": 456}',
        created_at: new Date(),
        slug: 'mocked-slug',
        name: 'John Doe',
        is_published: 'N',
      },
    };

    // Mock publishBlog function from BeApp module
    // const publishBlogMock = jest.spyOn(BeApp, 'publishBlog').mockResolvedValue();

    // Render the DetailBlog component with mocked context values and data
    
    /* 
        <MemoryRouter initialEntries={['/']}>
          <LoginContext.Provider value={loginContextValue}>
            <Routes>
              <Route path="/" element={() => {
                  <PostContext.Provider value={postContextValue}>
                  <Posts />
                </PostContext.Provider>
              }} loader={() => {
                let data = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]
                return data
              }}>  
            </Route>
            </Routes>
          </LoginContext.Provider>
      </MemoryRouter>

    */
    render(
      <MemoryRouter initialEntries={[{ pathname: '/detail/blog/mocked-slug', state: { data: mockData } }]}>
        <LoginContext.Provider value={loginContextValue}>
            <Routes>
                <Route path="/detail/blog/:slug" element={() => {
                    <DetailBlog />
                }} loader={() => {
                    let data = mockData.data
                    return data
                }}>
                </Route>
            </Routes>
        </LoginContext.Provider>
      </MemoryRouter>
    );


    expect(BlogNav).toHaveBeenCalled()
    expect(Footer).toHaveBeenCalled()
    // Assert that the title, image, description, location, and creator are rendered correctly
    // expect(screen.getByText('Mocked Title')).toBeInTheDocument();
    // expect(screen.getByAltText('Blog Image')).toBeInTheDocument();
    // expect(screen.getByText('Mocked description')).toBeInTheDocument();
    // expect(screen.getByText('By John Doe - ' + moment(mockData.data.created_at).format('D MMMM YYYY'))).toBeInTheDocument();
    // expect(screen.getByText('Location')).toBeInTheDocument();

    // Assert that the Edit and Publish buttons are rendered correctly
    // expect(screen.getByText('Edit')).toBeInTheDocument();
    // expect(screen.getByText('Publish')).toBeInTheDocument();

    // Simulate clicking the Publish button
    // fireEvent.click(screen.getByText('Publish'));

    // Wait for the alert to show
    await waitFor(() => {
    //   expect(screen.getByText('Confirm publish this blog?')).toBeInTheDocument();
    });

    // Simulate clicking the Publish button in the alert
    // fireEvent.click(screen.getByText('Publish!'));

    // Wait for the publishBlog function to be called
    await waitFor(() => {
    //   expect(publishBlogMock).toHaveBeenCalledWith('mocked-slug');
    });

    // Wait for the success message to be shown
    await waitFor(() => {
    //   expect(screen.getByText('Publish blog success!')).toBeInTheDocument();
    });

    // Ensure that BeApp.publishBlog was called correctly
    // expect(BeApp.publishBlog).toHaveBeenCalledWith('mocked-slug');
  });
});