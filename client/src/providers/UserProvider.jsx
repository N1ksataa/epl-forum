import React, { createContext, useState, useContext } from 'react';
import usePersistedState from '../hooks/usePersistedState';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = usePersistedState('user', null);
    const [authToken, setAuthToken] = usePersistedState('authToken', '');

    const login = (userData, token) => {
        setUser(userData);
        setAuthToken(token);
    };

    const logout = () => {
        setUser(null);
        setAuthToken('');
    };

    return (
        <UserContext.Provider value={{ user, authToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
