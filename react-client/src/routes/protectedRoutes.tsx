import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";



export function ProtectedRoute (){
  
    
    const { token,setToken } = useAuth();
  
    // Check if the user is authenticated
    if (!token) {
      if (!localStorage.getItem("token")) {
        setToken(null);
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
      }
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
  };


  