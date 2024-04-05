import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/component/Login';
import { LoginContext } from '../src/context/LoginContext';
import axios from 'axios';

// Mock the useGoogleLogin hook
jest.mock('@react-oauth/google', () => ({
    googleLogout: jest.fn(),
    useGoogleLogin: jest.fn(),
  }));
  
  // Mock the axios library
  jest.mock('axios');


describe('Login component', () => {
    const mockContextValue = {
        email: '',
        name: '',
        id: '',
        handleData: jest.fn(),
    };

    it('triggers login function on button click', async () => {
        jest.mock('@react-oauth/google', () => ({
            googleLogout: jest.fn(),
            useGoogleLogin: jest.fn().mockReturnValue({ onSuccess: jest.fn() })
        }));
        const userData = {
            email: 'test@example.com',
            name: 'Test User',
            id: '123456',
          };
      
        axios.get.mockResolvedValueOnce({ data: userData });

        const { getByText } = render(
        <LoginContext.Provider value={mockContextValue}>
            <Login />
        </LoginContext.Provider>
        );

        fireEvent.click(getByText('Sign in'));
        

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=undefined`, {
              headers: {
                Authorization: 'Bearer undefined',
                Accept: 'application/json',
              },
            });
            expect(mockContextValue.handleData).toHaveBeenCalledWith(userData);
        });
    });
});