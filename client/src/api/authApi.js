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

export const useUpdateProfile = () => {
    const { updateUser, authToken } = useUserContext();

    const updateProfile = async (username, email) => {
        try {
            const response = await request.put(`${baseUrl}/profile`, { username, email }, authToken);

            if (response.error) {
                throw new Error('Failed to update profile');
            }

            const { user } = response;
            updateUser(user, authToken);

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { updateProfile };
};

export const useUpdatePassword = () => {
    const { user, authToken } = useUserContext();

    const updatePassword = async (oldPassword, newPassword) => {
        try {
            const response = await request.put(`${baseUrl}/profile/update-password`, { oldPassword, newPassword }, authToken);

            if (response.error) {
                throw new Error('Failed to update password');
            }

            return response.message;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { updatePassword };
};