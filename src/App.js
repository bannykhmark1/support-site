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
    const [authState, setAuthState] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [isWhitelisted, setIsWhitelisted] = useState(false);

<<<<<<< HEAD
    const allowedIPs = ["85.116.120.50", "94.24.238.242", "194.60.134.75"];
=======
    const allowedIPs = ["85.116.120.50", "94.24.238.242"];
>>>>>>> c12f3053a01a85d42c4ad265da5fe42c56da959f

    // Функция для получения IP
    const fetchIP = async () => {
        try {
            const response = await fetch('https://api64.ipify.org?format=json');
            const data = await response.json();
            if (allowedIPs.includes(data.ip)) {
                setIsWhitelisted(true);
                setAuthState(true);
                user.setIsAuth(true);
            }
        } catch (error) {
            console.error("Ошибка при получении IP:", error);
        }
    };

    useEffect(() => {
        fetchIP();
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setAuthState(true);
                user.setIsAuth(true);
                setUserRole(decodedToken.role);
            } catch (e) {
                console.error("Ошибка при декодировании токена:", e);
                localStorage.removeItem('token');
            }
        }
    }, [user]);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6x container bg-[#d0dec7] mx-auto p-8 rounded-lg shadow-lg">
                {!authState && !isWhitelisted ? (
                    <Auth setAuthState={setAuthState} /> 
                ) : (
                    <>
                        <Header isAuthenticated={authState} handleLogout={() => user.logout()} />
                        <div className="md:flex justify-between">
                            <ContactForm />
                            <ListAnnouncement userRole={userRole} />
                        </div>
                        <Feedback />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
