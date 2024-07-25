import React, { useEffect, useState } from 'react';
import { check } from "./http/userAPI";
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import MessengerWidget from './components/MessengerWidget';
import LoginYaID from './components/LoginYaID';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  useEffect(() => {
    // Проверяем localStorage на наличие данных о Яндекс ID
    const yandexAuthData = localStorage.getItem('yandex_auth');
    if (yandexAuthData) {
      setIsYandexAuth(true);
    } else {
      // Проверяем параметры URL на наличие данных о Яндекс ID
      const queryParams = new URLSearchParams(window.location.search);
      const userData = queryParams.get('data');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          localStorage.setItem('yandex_auth', JSON.stringify(parsedData)); // Сохраняем данные в localStorage
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
      // Допустим, функция check() делает запрос для получения данных о пользователе
      check()
        .then(userData => {
          if (userData) {
            localStorage.setItem('yandex_auth', JSON.stringify(userData)); // Обновляем localStorage
          }
        })
        .catch(err => {
          console.error('Ошибка при проверке пользователя', err);
        })
        .finally(() => setLoading(false));
    }
  }, [isYandexAuth]);

  // Функция для выхода из Яндекс ID
  const handleLogout = () => {
    // Удаляем данные из localStorage
    localStorage.removeItem('yandex_auth');
    setIsYandexAuth(false);

    // Выполняем выход из Яндекс ID
    const clientId = process.env.REACT_APP_YANDEX_CLIENT_ID;
    const redirectUri = 'https://your-app-url.com'; // URL для редиректа после выхода

    window.location.href = `https://oauth.yandex.ru/logout?client_id=${clientId}&redirect_uri=${redirectUri}`;
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
