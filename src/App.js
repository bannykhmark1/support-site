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
    const allowedDomains = ['kurganmk', 'reftp', 'hobbs-it'];
    const originDomain = data.originDomain || ''; // Убедимся, что значение существует
  
    console.log('Полученный домен:', originDomain);
  
    if (typeof originDomain === 'string' && allowedDomains.some(domain => originDomain.includes(domain))) {
      localStorage.setItem('yandexToken', data.token);
      setIsYandexAuth(true);
    } else {
      console.log('Недопустимый домен или домен не предоставлен:', originDomain);
      alert('Авторизация с этого домена недопустима.');
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
