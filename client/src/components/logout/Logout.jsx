import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

const Logout = () => {
    const { logout } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {

        logout();
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');

        navigate("/login");
    }, [logout, navigate]);

    return null;
};

export default Logout;