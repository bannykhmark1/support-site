import React, { useContext, useEffect, useState } from 'react';
import { Context } from "./index";
import { check } from "./http/userAPI";
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ListAnnouncement from './components/ListAnnouncement';
import MessengerWidget from './components/MessengerWidget';
import LoginYaID from './components/LoginYaID';
import './App.css';
import axios from 'axios'; // Для проверки авторизации через Яндекс

function App() {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [isYandexAuth, setIsYandexAuth] = useState(false);
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // Проверка существующей авторизации
    if (isAuth) {
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
  }, [isAuth, user]);

  useEffect(() => {
    // Проверка авторизации через Яндекс ID
    axios.get('api/auth/yandex/user')
      .then(response => {
        if (response.data) {
          setIsYandexAuth(true);
        } else {
          setIsYandexAuth(false);
        }
      })
      .catch(err => {
        console.error('Ошибка при проверке авторизации через Яндекс', err);
        setIsYandexAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);

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
          <LoginYaID setIsYandexAuth={setIsYandexAuth} />
        )}
      </div>
    </div>
  );
}

export default App;
