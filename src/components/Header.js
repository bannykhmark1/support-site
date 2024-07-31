import React, { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Auth from './Auth';
import { Context } from "../index";
import { check } from "../http/userAPI";

const Header = ({ isYandexAuth, handleYandexLogout }) => {
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

  const showButtons = user.isAuth || isYandexAuth;

  return (
    <div className={`flex flex-col md:flex-row justify-between items-center text-center mb-8 mx-auto max-w-6xl p-4 ${!showButtons ? 'items-center' : ''}`}>
      <img src="hobbs-logo.png" alt="Логотип" className={`md:w-64 w-48 mb-4 md:mb-0 ${!showButtons ? 'mx-auto' : ''}`} />
      {showButtons && (
        <div className="flex space-x-2">
          {user.isAuth ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Выйти
            </button>
          ) : (
            <>
              {isYandexAuth && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
                >
                  Авторизация
                </button>
              )}
              {isYandexAuth && (
                <button
                  onClick={handleYandexLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Выйти из Яндекс ID
                </button>
              )}
            </>
          )}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Header;
