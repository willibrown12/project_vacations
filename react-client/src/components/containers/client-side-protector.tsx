import { Children, ReactNode } from "react"
import { Navigate } from "react-router-dom"

export function ClientSideProtector(props: { children: ReactNode }) {
    if (!localStorage.getItem("token")) {
        return <Navigate to={"/login"} />
    } else {
        return props.children
    }
}
