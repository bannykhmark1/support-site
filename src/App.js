import React, { useContext, useEffect } from 'react';
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

    // Восстановление авторизации при загрузке страницы
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Проверяем, не истек ли срок действия токена
                if (decodedToken.exp * 1000 > Date.now()) {
                    user.setIsAuth(true);
                } else {
                    localStorage.removeItem('token');
                }

                // Настройка таймера для автоматического выхода
                const timeLeft = decodedToken.exp * 1000 - Date.now();
                setTimeout(() => {
                    user.setIsAuth(false);
                    localStorage.removeItem('token');
                }, timeLeft);
            } catch (e) {
                console.error("Ошибка при декодировании токена:", e);
                localStorage.removeItem('token');
            }
        }
    }, [user]);

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {!user.isAuth ? (
                    <Auth onLogin={() => user.setIsAuth(true)} /> // Передаем onLogin как пропс
                ) : (
                    <>
                        <Header isAuthenticated={user.isAuth} handleLogout={() => user.logout()} />
                        <div className="md:flex">
                            <ContactForm />
                            <ListAnnouncement userRole={user.user.role} />
                        </div>
                        <Feedback />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
