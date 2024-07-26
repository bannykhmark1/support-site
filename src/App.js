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
    console.log(token)
    if (token) {
      checkTokenValidity(token)
        .then(isValid => setIsYandexAuth(isValid))
        .catch(() => setIsYandexAuth(false));
    }
  }, []);

  const handleAuthSuccess = (data) => {
    const allowedDomains = ['kurganmk.ru', 'reftp.ru', 'hobbs-it.ru'];
    const userEmail = data.default_email || ''; // Используем default_email для получения почты
  
    console.log('Полученный email:', userEmail);
  
    if (typeof userEmail === 'string' && userEmail.includes('@')) {
      const userDomain = userEmail.split('@')[1]; // Извлечение домена из email
      if (allowedDomains.includes(userDomain)) {
        localStorage.setItem('yandexToken', data.token);
        setIsYandexAuth(true);
      } else {
        console.log('Недопустимый домен:', userDomain);
        alert('Авторизация с этого домена недопустима.');
      }
    } else {
      console.log('Email пользователя не предоставлен или невалиден:', userEmail);
      alert('Не удалось получить данные пользователя для авторизации.');
    }
  };
  
  
  
  useEffect(() => {
    const token = localStorage.getItem('yandexToken');
    console.log(token)
    if (token) {
      checkTokenValidity(token)
        .then(isValid => setIsYandexAuth(isValid))
        .catch(() => setIsYandexAuth(false));
    }
  }, []);
  

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
