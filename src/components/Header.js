import React, { useContext, useState } from 'react';
import Modal from './Modal';
import Auth from './Auth';
import { Context } from "../index";

const Header = ({ isAuthenticated, handleLogout }) => {
  const { user } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showButtons = isAuthenticated || user.isAuth;

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    user.setIsAuth(false); // Обновляем состояние авторизации
    if (handleLogout) handleLogout(); // Вызываем переданный пропс handleLogout
    window.location.reload(); // Перезагружаем страницу
  };

  return (
    <header className="flex flex-col md:flex-row items-start justify-between mx-auto max-w-6xl p-4">
      <div className="flex flex-col items-center md:items-center">
        <img
          src="hobbs-logo.png"
          alt="Логотип"
          className="w-48 md:w-64 mb-4 md:mb-0"
        />
        <span className="md:ml-4 md:mt-2 text-lg">8-800-555-35-35</span>
      </div>
      {showButtons && (
        <nav className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
          <a
            className="border p-2 border-black rounded hover:bg-gray-200"
            href="https://wiki.yandex.ru/homepage/bazaznanijjkmk/support.-pervaja-linija/instrukcija-po-edinojj-forme-obrashhenija-v-sluzhb/"
          >
            Инструкция по Единой форме обращения
          </a>
          {user.isAuth ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogoutClick}
            >
              Выйти
            </button>
          ) : (
            <>
              {/* Дополнительные кнопки, если нужно */}
            </>
          )}
        </nav>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth onClose={() => setIsModalOpen(false)} />
      </Modal>
    </header>
  );
};

export default Header;
