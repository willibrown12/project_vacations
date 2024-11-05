import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context";

import { Home } from "../components/pages/home";
import RegistrationForm from "../components/pages/register";
import { Vacations } from "../components/pages/vacations";
import ResponsiveAppBar from "../components/pages/root/root";
import LoginPage from "../components/pages/login";
import { ProtectedRoute } from "./protectedRoutes";
import Logout from "../components/pages/logout";



export function RoutesArray(){
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
        path: "/",
        label: "Home",
        element:  <Navigate to="/home" replace />,
       
    },
    {
        path: "/home",
        label: "Home",
        element: <Home />
       
    },
    {
      path: "/aboutus",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
            path: "Vacations",
            label: "Vacations",
            element: <Vacations />
           
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
            path: "/logout",
            element:  <Logout />,
          },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    
    {
      path: "/login",
      element:<LoginPage/>,
    },
    {
        path: "register",
        label: "Register",
        element: <RegistrationForm />,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ResponsiveAppBar />, // Main layout component
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
      ],
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default RoutesArray;