import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function GuestGuard() {
    const { authToken } = useUserContext();

    return !authToken ? <Outlet /> : <Navigate to="/posts" />;
}