import React, { createContext, useContext, useState, useEffect } from 'react';

// Создание контекста
const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Инициализация состояния из localStorage
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);