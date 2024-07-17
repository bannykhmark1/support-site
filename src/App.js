
import Auth from './components/Auth';
import Header from './components/Header';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from "./index";
import React from "react";
import { check } from "./http/userAPI";
import ListAmmouncement from './components/ListAnnouncement'
import CreateAnnouncement from './components/CreateAnnouncement';
import EditAnnouncement from './components/EditAnnouncement';

function App() {

  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    user.restoreAuth(); // Восстанавливаем авторизацию при загрузке
    console.log('Restored Auth State:', user.isAuth);
    check()
      .then(userData => {
        if (userData) {
          user.setUser(userData);
        }
      })
      .catch(err => {
        console.error('Ошибка при проверке пользователя', err);
        // Здесь можно обработать ошибку, если нужно, например, показав уведомление пользователю
      })
      .finally(() => setLoading(false));
  }, [user, loading]); // Добавляем loading в зависимости

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <Header />
        <ListAmmouncement />
        <ContactForm />
        <ContactInfo />

      </div>
    </div>
  );
}

export default App;
