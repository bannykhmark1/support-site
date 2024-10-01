import React, { useContext, useState, useEffect } from 'react';
import { Context } from './index';
import { jwtDecode } from 'jwt-decode';
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import Feedback from "./components/FeedBack";
import Auth from "./components/Auth";
import './App.css';

function App() {
    const { user } = useContext(Context);
    const [authState, setAuthState] = useState(false); // Новая переменная состояния
    const [userRole, setUserRole] = useState(''); // Переменная состояния для роли пользователя

    // Восстановление авторизации при загрузке страницы
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Проверяем, не истек ли срок действия токена
                if (decodedToken.exp * 1000 > Date.now()) {
                    setAuthState(true); // Обновляем authState
                    user.setIsAuth(true);
                    setUserRole(decodedToken.role); // Устанавливаем роль пользователя
                } else {
                    localStorage.removeItem('token');
                }
            } catch (e) {
                console.error("Ошибка при декодировании токена:", e);
                localStorage.removeItem('token');
            }
        }
    }, [user]);

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {!authState ? (
                    <Auth setAuthState={setAuthState} /> 
                ) : (
                    <>
                        <Header isAuthenticated={authState} handleLogout={() => user.logout()} />
                        <div className="md:flex">
                            <ContactForm />
                            <ListAnnouncement userRole={userRole} /> {/* Передаем userRole как пропс */}
                        </div>
                        <Feedback />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
