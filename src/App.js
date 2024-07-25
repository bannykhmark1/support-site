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
    // Проверяем localStorage на наличие данных о пользователе
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        user.setUser(parsedData);
        user.setIsAuth(true);
        setIsYandexAuth(true);
      } catch (error) {
        console.error('Ошибка парсинга данных пользователя:', error);
      }
    } else {
      // Если нет данных, проверяем параметры URL
      const queryParams = new URLSearchParams(window.location.search);
      const userData = queryParams.get('data');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          user.setUser(parsedData);
          user.setIsAuth(true);
          localStorage.setItem('user', JSON.stringify(parsedData)); // Сохраняем в localStorage
          setIsYandexAuth(true);
        } catch (error) {
          console.error('Ошибка парсинга данных пользователя:', error);
        }
      } else {
        setIsYandexAuth(false);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isYandexAuth) {
      check()
        .then(userData => {
          if (userData) {
            user.setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // Обновляем localStorage
          }
        })
        .catch(err => {
          console.error('Ошибка при проверке пользователя', err);
        })
        .finally(() => setLoading(false));
    }
  }, [isYandexAuth, user]);

  // Функция для выхода из системы
  const handleLogout = () => {
    user.setUser(null);
    user.setIsAuth(false);
    localStorage.removeItem('user'); // Удаляем данные из localStorage
    setIsYandexAuth(false);
  };

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
        <Header onLogout={handleLogout} /> {/* Передаем функцию для выхода из системы в Header */}
        {isYandexAuth ? (
          <>
            <MessengerWidget />
            <ListAnnouncement />
            <ContactForm />
          </>
        ) : (
          <LoginYaID setIsYandexAuth={setIsYandexAuth} />
        )}
      </div>
    </div>
  );
}

export default App;
