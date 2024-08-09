import React, { useState, useEffect, useCallback } from 'react';
import LoginYaID from './components/LoginYaID';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import Feedback from './components/FeedBack';
import RedirectToken from './components/RedirectToken'; // Убедитесь, что этот импорт правильный
import './App.css';

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('yandexToken');
    const isAuth = localStorage.getItem('isYandexAuth') === 'true';

    if (token && isAuth) {
      handleAuthSuccess({ access_token: token });
    }
  }, []);

  const handleAuthSuccess = useCallback((data) => {
    const token = data.access_token;
    if (token) {
      fetch('https://login.yandex.ru/info?format=json', {
        method: 'GET',
        headers: {
          'Authorization': `OAuth ${token}`,
        },
      })
        .then(response => response.json())
        .then(userInfo => {
          const allowedDomains = ['kurganmk.ru', 'reftp.ru', 'hobbs-it.ru'];
          const userEmail = userInfo.default_email || '';

          if (typeof userEmail === 'string' && userEmail.includes('@')) {
            const userDomain = userEmail.split('@')[1];
            if (allowedDomains.includes(userDomain)) {
              setIsYandexAuth(true);
              localStorage.setItem('isYandexAuth', 'true');
              localStorage.setItem('yandexToken', token);
            } else {
              setIsYandexAuth(false);
              localStorage.removeItem('isYandexAuth');
              localStorage.removeItem('yandexToken');
              alert('Авторизация с этого домена недопустима.');
            }
          } else {
            alert('Не удалось получить данные пользователя для авторизации.');
          }
        })
        .catch(error => {
          console.error('Ошибка при получении информации о пользователе:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    setIsYandexAuth(false);
    localStorage.removeItem('isYandexAuth');
    localStorage.removeItem('yandexToken');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header isYandexAuth={isYandexAuth} handleYandexLogout={handleLogout} />
        {isYandexAuth ? (
          <>
            <div className="md:flex">
              <ContactForm />
              <ListAnnouncement />
            </div>
            <Feedback />
          </>
        ) : (
          <>
            <LoginYaID onAuthSuccess={handleAuthSuccess} />
            <RedirectToken onAuthSuccess={handleAuthSuccess} />  {/* Убедитесь, что сюда передается функция */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
