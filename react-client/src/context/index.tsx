import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { vacationCardUI } from "../components/pages/vacations/vacationsList";

type TokenPayload = {
    fullName: string
    role: string;
    idUser:number
};


type DecodedToken = TokenPayload & { exp: number };

type tokenType = {
    token: string,
    setToken: (token: string | null) => void;
}

type userType = {
 
    role: boolean,
    fullName: string
}

type editVacationType = {
    editVacation: vacationCardUI,
    seteditVacation: (editVacation: vacationCardUI | null) => void;
}



const AuthContext = createContext<tokenType>({} as tokenType)
const userContext = createContext<userType>({} as userType)
const editContext = createContext<editVacationType>({} as editVacationType)

export function ContextWrapper({ children }: any) {
   
    const [token, setTokenState] = useState<string | null>(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [full_Name, setFullName] = useState<string>("");
    const [editVacation, seteditVacation] = useState<vacationCardUI>({} as vacationCardUI);
   
 
    if(localStorage.getItem("token") && token===undefined){
    const decoded: TokenPayload = jwtDecode(token);
    setFullName(decoded.fullName);
  }
  

  useEffect(() => {
    if (token) {
        try {
            const decoded: DecodedToken = jwtDecode(token);
            setFullName(decoded.fullName); 
            setIsAdmin(decoded.role === "admin"); 
           
            axios.defaults.headers.common["Authorization"] = token;
        } catch (error) {
            console.error("Failed to decode token:", error);
           
        }
    } else {
       
        setFullName("");
        setIsAdmin(false);
        
        delete axios.defaults.headers.common["Authorization"];
    }
}, [token]);


    const isTokenValid = (token: string | null): boolean => {
        if (!token) return false;

        let decodedToken:DecodedToken;
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

    
    const contextValuetype: any = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );


    const userContextValue = { role: isAdmin, fullName: full_Name};
    const editContextValue = { editVacation, seteditVacation };

    return (
        <AuthContext.Provider value={contextValuetype}>
            <userContext.Provider value={userContextValue}>
            <editContext.Provider value={editContextValue as editVacationType}>
                {children}
               </editContext.Provider>
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

export function useEditContext() {
    const result = useContext(editContext);
    return result
};



