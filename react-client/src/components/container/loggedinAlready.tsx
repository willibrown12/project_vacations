import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

export function LoggedInAlready(props: { children: ReactNode }) {
    const { token } = useAuth();
    if (token) {
        return <Navigate to={"/home"} />;
    } else {
        return <>{props.children}</>;
    }
}