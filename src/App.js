import React, { useContext, useEffect, useState } from 'react';
import { Context } from "./index";
import { check } from "./http/userAPI";
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import MessengerWidget from './components/MessengerWidget';
import LoginYaID from './components/LoginYaID';
import './App.css';

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userData = queryParams.get('data');
    if (userData) {
      user.setUser(JSON.parse(userData));
      user.setIsAuth(true);
      setIsYandexAuth(true);
    } else {
      setIsYandexAuth(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isYandexAuth) {
      user.restoreAuth(); // Восстанавливаем внутреннюю авторизацию
      console.log('Restored Auth State:', user.isAuth);
      check()
        .then(userData => {
          if (userData) {
            user.setUser(userData);
          }
        })
        .catch(err => {
          console.error('Ошибка при проверке пользователя', err);
        })
        .finally(() => setLoading(false));
    }
  }, [isYandexAuth, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header />
        {isYandexAuth ? (
          <>
            <MessengerWidget />
            <ListAnnouncement />
            <ContactForm />
          </>
        ) : (
          <LoginYaID />
        )}
      </div>
    </div>
  );
}

export default App;
