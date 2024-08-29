import React, { useContext, useEffect } from 'react';
import { Context } from './index';
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import Feedback from "./components/FeedBack";
import Auth from "./components/Auth";
import './App.css';

function App() {
    const { user } = useContext(Context);
    console.log(user)
    // Обновляем компонент, когда изменяется состояние авторизации
    useEffect(() => {
        // Логика для восстановления авторизации при загрузке
        user.restoreAuth();
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
