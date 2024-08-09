import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import MessengerWidget from './components/MessengerWidget';
import LoginYaID from './components/LoginYaID';
import RedirectToken from './components/RedirectToken';
import FeedbackForm from './components/FeedbackForm';
import Feedback from './components/FeedBack';
import './App.css';

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    // Проверка состояния авторизации при инициализации
    const token = Cookies.get('yandexToken');
    const isAuth = Cookies.get('isYandexAuth') === 'true';

    if (token && isAuth) {
      handleAuthSuccess({ access_token: token });
    }
  }, []);

  const handleAuthSuccess = (data) => {
    const token = data.access_token; // Получаем токен из данных
    if (token) {
      // Используем токен для запроса информации о пользователе
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
              Cookies.set('isYandexAuth', 'true', { expires: 7 }); // Куки на 7 дней
              Cookies.set('yandexToken', token, { expires: 7 });
            } else {
              setIsYandexAuth(false);
              Cookies.remove('isYandexAuth');
              Cookies.remove('yandexToken');
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
    Cookies.remove('isYandexAuth');
    Cookies.remove('yandexToken');
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
            <RedirectToken onAuthSuccess={handleAuthSuccess} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
