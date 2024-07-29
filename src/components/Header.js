import React, { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Auth from './Auth';
import { Context } from "../index";
import { check } from "../http/userAPI";

const Header = ({ isYandexAuth }) => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user.restoreAuth(); // Восстанавливаем авторизацию при загрузке

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

  return (
    <div className="flex justify-center relative text-center mb-8 mx-auto max-w-4xl">
      <img src="hobbs-logo.png" alt="Логотип" className="md:mx-auto md:w-64 w-48" />
      {user.isAuth ? (
        <button
          className="top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleLogout}
        >
          Выйти
        </button>
      ) : (
        isYandexAuth && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="md:absolute top-0 right-0 bg-black md:mt-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          >
            Авторизация
          </button>
        )
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Header;
