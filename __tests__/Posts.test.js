// Home.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoginContext } from '../src/context/LoginContext';
import { PostContext } from '../src/context/postContext';
import Posts from '../src/component/Posts';
import PostCard from '../src/component/PostCard';
import '@testing-library/jest-dom'

// Mock BeApp module
jest.mock('../src/helpers/api_call/BeApp', () => ({
  getBlogs: jest.fn().mockResolvedValue({ data: { data: [] } }),
}));
jest.mock('../src/component/PostCard', () => jest.fn(() => <div>Mocked Posts Card</div>));
describe('Home component', () => {
  test('renders posts correctly', async () => {
    // Mock context values
    const loginContextValue = {
      isLogin: true,
      email: 'example@example.com',
    };

    const postContextValue = {
      data: {
        data: [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }],
      },
      handleData: jest.fn(),
      getData: jest.fn().mockReturnValue([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]),
    };
    

    // Render the Home component with mocked context values
    const {container} = render(
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
    );

    // Expect the posts to be rendered
    console.log(container)
    // expect(container).toHaveClass('justify-content-between')
    // expect(screen.getByText('Post 2')).toBeInTheDocument();
    // Ensure that BeApp.getBlogs was called with the correct parameters
    // expect(require('../src/helpers/api_call/BeApp').getBlogs).toHaveBeenCalledWith({ page: 2, email: 'example@example.com' });
  });
});