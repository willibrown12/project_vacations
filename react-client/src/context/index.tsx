import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
    fullName: string
    role: string;
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


    // Function to set the authentication token
    function setToken (newToken: string)  {
        setTokenState(newToken);
        if (newToken) {
            const decoded: TokenPayload = jwtDecode(newToken);
           console.log(decoded.fullName);
           
            setFullName(decoded.fullName);
            setIsAdmin(decoded.role === "admin" );}else{
                setFullName("");
                setIsAdmin(false)
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


    const userContextValue = { role: isAdmin, fullName: full_Name };

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


