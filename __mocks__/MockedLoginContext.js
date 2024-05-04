// __mocks__/LoginContext.js

import React from 'react';

export const mockLoginContextValue = {
  email: 'example@example.com',
  name: 'John Doe',
  id: '123',
  isLogin: true,
  token: 'mockToken',
  role: 'admin',
  handleData: jest.fn(),
  isSameUser: jest.fn(),
  isAdmin: jest.fn(),
  logoutLoginContext: jest.fn(),
};

const mockLoginContextProvider = ({ children }) => {
  return (
    <mockLoginContext.Provider value={mockLoginContextValue}>
      {children}
    </mockLoginContext.Provider>
  );
};

export const mockLoginContext = {
  Consumer: ({ children }) => children(mockLoginContextValue),
};

export default mockLoginContextProvider;