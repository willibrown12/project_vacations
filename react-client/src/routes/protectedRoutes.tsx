import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";



export function ProtectedRoute (){
  
    
    const { token,setToken } = useAuth();
  
  
    if (!token) {
      if (!localStorage.getItem("token")) {
        setToken(null);
      
        return <Navigate to="/login" />;
      }
    }
  
    
    return <Outlet />;
  };


  