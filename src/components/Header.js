import React, { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import Auth from './Auth';
import { Context } from "../index";


const Header = ({ isYandexAuth, handleYandexLogout }) => {
  const { user } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    user.logout();
    window.location.reload(); // Обновляем страницу после выхода
  };

  const showButtons = user.isAuth || isYandexAuth;

  return (
    <header className="flex flex-col md:flex-row items-start justify-between mx-auto max-w-6xl p-4">
  {isYandexAuth ? (
        <div className="flex flex-col items-center md:items-center">
          <img
            src="hobbs-logo.png"
            alt="Логотип"
            className="w-48 md:w-64 mb-4 md:mb-0"
          />
          <span className="md:ml-4 md:mt-2 text-lg">8-800-555-35-35</span>
        </div>
      ) : (
        <div className="flex flex-col m-auto items-center md:items-center">
          <img
            src="hobbs-logo.png"
            alt="Логотип"
            className="w-48 md:w-64 mb-4 md:mb-0"
          />
          <span className="md:ml-4 md:mt-2 text-lg">8-800-555-35-35</span>
        </div>
      )}
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
              onClick={handleLogout}
            >
              Выйти
            </button>
          ) : (
            <>
  
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
        </nav>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Auth onClose={() => setIsModalOpen(false)} />
      </Modal>
    </header>
  );
};

export default Header;
