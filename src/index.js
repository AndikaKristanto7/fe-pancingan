import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import BeApp from './helpers/api_call/BeApp';
import DetailBlog from './view/DetailBlog';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/blog/:slug",
    loader: async ({ request, params }) => {
      const data =  BeApp.getBlogBySlug(params.slug).then((data) => {
        return data
      })
      return data
    },
    element:<DetailBlog/>
  }
])
root.render(
  <GoogleOAuthProvider clientId="264453007037-se1p7cd0ibhua46juqu4ge51kbleik5i.apps.googleusercontent.com">
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </GoogleOAuthProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
