import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import MessengerWidget from './components/MessengerWidget';
import LoginYaID from './components/LoginYaID';
import './App.css';

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  useEffect(() => {
    // Проверка токена из localStorage или другого источника
    const token = localStorage.getItem('yandexToken');
    console.log(getItem('yandexToken'))
    if (token) {
      // Если токен есть, проверяем его валидность, например, через API запрос
      checkTokenValidity(token)
        .then(isValid => setIsYandexAuth(isValid))
        .catch(() => setIsYandexAuth(false));
    }
  }, []);

  const handleAuthSuccess = (data) => {
    // Сохранение токена и обновление состояния
    localStorage.setItem('yandexToken', data.token);
    setIsYandexAuth(true);
  };

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
          <LoginYaID onAuthSuccess={handleAuthSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;
