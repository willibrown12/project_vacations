import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";


import { Home } from "../components/pages/home";
import RegistrationForm from "../components/pages/register";
import { Vacations } from "../components/pages/vacations";
import ResponsiveAppBar from "../components/pages/root/root";
import LoginPage from "../components/pages/login";
import { ProtectedRoute } from "./protectedRoutes";
import Logout from "../components/pages/logout";
import VacationForm from "../components/pages/vacationsEdit";
import CreateVacationForm from "../components/pages/createVacation";
import StatisticsPage from "../components/pages/charts/charts";
import AccordionExpandIcon from "../components/pages/about-us/aboutus";
import { AdminProtector } from "../components/container/adminRouteProtector";
import { LoggedInAlready } from "../components/container/loggedinAlready";



export function RoutesArray(){
  

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
      element: <AccordionExpandIcon/>,
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
            path: "/logout",
            element:  <Logout />,
          }, 
           {
            path: "Vacations/edit",
            label: "Vacations_edit",
            element: <AdminProtector><VacationForm /> </AdminProtector>
           
        }, {
          path: "create-vacation",
          label: "create-vacation",
          element:<AdminProtector> <CreateVacationForm /></AdminProtector>
         
      },{
        path: "charts",
        label: "charts",
        element: <StatisticsPage />
       
    }
      ],
    },
  ];
  
  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    
    {
      path: "/login",
      element:<LoggedInAlready><LoginPage/></LoggedInAlready>,
    },
    {
        path: "register",
        label: "Register",
        element: <LoggedInAlready><RegistrationForm /></LoggedInAlready>,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ResponsiveAppBar />, // Main layout component
      children: [
        ...routesForPublic,
        ...(routesForNotAuthenticatedOnly ),
        ...routesForAuthenticatedOnly,
      ],
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default RoutesArray;