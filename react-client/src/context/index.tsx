import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
    fullName: string
    role: string;
    idUser:number
};


type tokenType = {
    token: string,
    setToken: (token: string | null) => void;
}

type userType = {
 
    role: boolean,
    fullName: string
}


const AuthContext = createContext<tokenType>({} as tokenType)
const userContext = createContext<userType>({} as userType)

export function ContextWrapper({ children }: any) {
    // State to hold the authentication token
    const [token, setTokenState] = useState<string | null>(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [full_Name, setFullName] = useState<string>("");
   
 
    if(localStorage.getItem("token") && token===undefined){
    const decoded: TokenPayload = jwtDecode(token);
    setFullName(decoded.fullName);
  }
  

  useEffect(() => {
    if (token) {
        try {
            const decoded: TokenPayload = jwtDecode(token);
            setFullName(decoded.fullName); // Set the full name from the token
            setIsAdmin(decoded.role === "admin"); // Set admin status based on the role
           
            axios.defaults.headers.common["Authorization"] = token; // Set the Authorization header
        } catch (error) {
            console.error("Failed to decode token:", error);
            // Handle error (e.g., clear token, redirect to login, etc.)
        }
    } else {
        // If there is no token, clear auth-related states
        setFullName("");
        setIsAdmin(false);
        
        delete axios.defaults.headers.common["Authorization"];
    }
}, [token]);


    const isTokenValid = (token: string | null): boolean => {
        if (!token) return false;

        let decodedToken;
        try {
            decodedToken = jwtDecode<any & { exp: number }>(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return false;
        }

        const currentDate = new Date();
        return (decodedToken.exp * 1000) > currentDate.getTime();
    };



    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        
        if (newToken && isTokenValid(newToken)) {
            const decoded: TokenPayload = jwtDecode(newToken);
            setFullName(decoded.fullName);
            setIsAdmin(decoded.role === "admin");
            axios.defaults.headers.common["Authorization"] = newToken;
            localStorage.setItem("token", newToken);
        } else {
       
            setFullName("");
            setIsAdmin(false);
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            window.location.href = "/login"; 
        }
    };



    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValuetype: any = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );


    const userContextValue = { role: isAdmin, fullName: full_Name};

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValuetype}>
            <userContext.Provider value={userContextValue}>
                {children}
            </userContext.Provider>
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const result = useContext(AuthContext);
    return result
};


export function useUserContext() {
    const result = useContext(userContext);
    return result
};


