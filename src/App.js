import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import MessengerWidget from './components/MessengerWidget';
import LoginYaID from './components/LoginYaID';
import RedirectToken from './components/RedirectToken';
import './App.css';
import checkTokenValidity from './checkTokenValidity';

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('yandexToken');
    const isAuth = localStorage.getItem('isYandexAuth') === 'true';
    if (token && isAuth) {
      handleAuthSuccess({ token });
    }

    const handleAuthMessage = (event) => {
      if (event.origin === window.location.origin) {
        handleAuthSuccess(event.data);
        window.location.reload();
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, []);

  const handleAuthSuccess = (data) => {
    const token = data.token;
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
  };

  const handleLogout = () => {
    setIsYandexAuth(false);
    localStorage.removeItem('isYandexAuth');
    localStorage.removeItem('yandexToken');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header />
        {isYandexAuth ? (
          <>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
              Выйти из Яндекс ID
            </button>
            <MessengerWidget />
            <ListAnnouncement />
            <ContactForm />
          </>
        ) : (
          <>
            <LoginYaID onAuthSuccess={handleAuthSuccess} />
            <RedirectToken onAuthSuccess={handleAuthSuccess} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
