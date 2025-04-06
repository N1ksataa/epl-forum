import { useUserContext } from "../contexts/UserContext";
import request from "../utils/request.js"

const baseUrl = `http://localhost:5000/api/users`;

export const useLogin = () => {
    const { login } = useUserContext();

    const loginUser = async (username, password) => {
        try {
            const response = await request.post(`${baseUrl}/login`, { username, password });

            if (response.error) {
                throw new Error('Invalid username or password');
            }

            const { user, token } = response;
            login(user, token);

            return { user, token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { loginUser };
};

export const useRegister = () => {
    const register = (email, username, password, favoriteTeam) =>
        request.post(`${baseUrl}/register`, {
            email,
            username,
            password,
            favoriteTeam
        });

    return { register };
};
export const useLogout = () => {
    const { logout } = useUserContext();

    const logoutUser = () => {
        logout();
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    return { logoutUser };
};
