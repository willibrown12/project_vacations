import {  ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useUserContext } from "../../context";

export function AdminProtector(props: { children: ReactNode }) {
    const {  role } = useUserContext();
    if (role !== true) {
        return <Navigate to={"/home"} />
    } else {
        return<>{props.children}</>;
    }
}