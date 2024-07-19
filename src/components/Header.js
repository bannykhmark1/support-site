import React, { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Auth from './Auth';
import { Context } from "../index";
import { check } from "../http/userAPI";

const Header = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    user.logout();
    window.location.reload(); // Обновляем страницу после выхода
  };

  console.log(user.user.role);

  return (
    <div className="relative text-center mb-8 mx-auto max-w-4xl">
      <img src="hobbs-logo.png" alt="Логотип" className="mx-auto w-64" />
      {user.isAuth ? (
        <button
          className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogout}
        >
          Выйти
        </button>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-0 right-0 bg-blue-500 mt-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Авторизация
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Header;
