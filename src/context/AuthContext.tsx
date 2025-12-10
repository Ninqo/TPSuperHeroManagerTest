import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole]   = useState<string | null>(localStorage.getItem('role'));

    const login = async (username: string, password: string) => {
        const { data } = await axios.post('/api/auth/login', { username, password });
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', payload.role);
        setToken(data.token);
        setRole(payload.role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(null);
        setRole(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};