import { useEffect } from 'react';

const useAuth = (authToken, navigate, logout) => {
    useEffect(() => {
        if (authToken) {
            try {
                const { exp } = parseJwt(authToken)
                const currentTime = Date.now() / 1000;

                if (exp < currentTime) {
                    logout();
                    navigate('/login');
                }

                const intervalId = setInterval(() => {
                    const { exp } = parseJwt(authToken);
                    if (exp < Date.now() / 1000) {
                        logout();
                        navigate('/login');
                        clearInterval(intervalId);
                    }
                }, 30000);

                return () => clearInterval(intervalId);

            } catch (error) {
                console.error('Invalid token:', error);
                logout();
                navigate('/login');
            }
        }
    }, [authToken, navigate, logout]);

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
        return JSON.parse(jsonPayload);
    };
};

export default useAuth;
