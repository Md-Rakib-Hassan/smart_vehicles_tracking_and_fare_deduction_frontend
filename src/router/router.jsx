import React from 'react';
import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import Layout from '../pages/Layout';
import PersonalInfo from '../pages/PersonalInfo';
import NotFound from '../pages/NotFound';
import StudentDashboard from '../pages/StudentDashboard';
import Activity from '../pages/Activity';
import AllUser from '../pages/AllUser';
import AddUser from '../pages/AddUser';
import AllDriver from '../pages/AllDriver';
import Dashboard from '../pages/Dashboard';
import BusAndRoutes from '../pages/BusAndRoutes';
import BusSchedules from '../pages/BusSchedules';

const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><Layout></Layout></PrivateRoute>,
      errorElement:<NotFound></NotFound>,
        children: [
            {
                path: '/bus-location',
                element:<App></App>
          },
          {
            path: "/personal-info",
            element:<PersonalInfo></PersonalInfo>
          },
          {
            path: "/dashboard",
            element:<Dashboard></Dashboard>
          },
          {
            path: "/bus-schedules",
            element:<BusSchedules></BusSchedules>
          },
          {
            path: '/activity',
            element:<Activity></Activity>
          },
          {
            path: "/view-users",
            element:<AllUser></AllUser>
          },
          {
            path: "/add-user",
            element:<AddUser></AddUser>
          },
          {
            path: "/all-drivers",
            element:<AllDriver></AllDriver>
          },
          {
            path: "/student-dashboard",
            element:<StudentDashboard></StudentDashboard>
          },
          {
            path: "/BusAndRoutes",
            element:<BusAndRoutes></BusAndRoutes>
          }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    }
  ]);

export default router;