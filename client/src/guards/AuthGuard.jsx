import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function AuthGuard() {
    const { authToken } = useUserContext();

    return authToken ? <Outlet /> : <Navigate to="/login" />;
}
