import React from 'react';
import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import Layout from '../pages/Layout';

const router = createBrowserRouter([
    {
      path: "/",
        element: <PrivateRoute><Layout></Layout></PrivateRoute>,
        children: [
            {
                path: '/',
                element:<App></App>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    }
  ]);

export default router;