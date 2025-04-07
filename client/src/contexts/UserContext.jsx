import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {

    const storedUser = localStorage.getItem('user');
    const [user, setUser] = useState(storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null);

    const [authToken, setAuthToken] = useState(
        localStorage.getItem('authToken') && localStorage.getItem('authToken') !== 'undefined' ? localStorage.getItem('authToken') : null
    );

    useEffect(() => {
        if (authToken) {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null);
        }
    }, [authToken]);

    const updateUser = (updatedFields) => {
        const currentUser = localStorage.getItem('user');
        const newUser = currentUser ? { ...JSON.parse(currentUser), ...updatedFields } : updatedFields;
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const login = (user, token) => {
        setUser(user);
        setAuthToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    return (
        <UserContext.Provider value={{ user, authToken, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
