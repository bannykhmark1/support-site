import React, { useContext, useState } from 'react';
import Modal from './Modal';
import Auth from './Auth';
import { Context } from "../index";
import { IoExitOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";

const Header = ({ isAuthenticated, handleLogout }) => {
  const { user } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false); // Состояние для бургер-меню

  const showButtons = isAuthenticated || user.isAuth;

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    user.setIsAuth(false); // Обновляем состояние авторизации
    if (handleLogout) handleLogout(); // Вызываем переданный пропс handleLogout
    window.location.reload(); // Перезагружаем страницу
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen); // Переключаем состояние бургер-меню
  };

  return (
    <header className="flex mx-auto container flex-col border-b border-[#02483A] justify-between md:flex-row items-center pb-4 md:pb-6 ">
      <div className="flex w-full md:w-max justify-between items-center">
        <div className="flex gap-4 md:gap-10 items-center">

          <img
            src="HOBBSxUAG.png"
            alt="Логотип"
            className="md:w-96 w-56 md:mb-0"
          />
          <span className='border-r-2 h-12 relative border-[#02483A] hidden md:block'></span>
          <div className="hidden self-center md:flex text-lg font-bold"> 
            <MdPhoneInTalk className='self-center mr-2' /> 
            
            <span>+7 (343) 364-44-60</span>
            
            </div>
        </div>

        {/* Иконка бургер-меню для мобильных устройств */}
        <button
          className="md:hidden text-2xl self-start text-[#02483A]"
          onClick={toggleBurgerMenu}
        >
          {isBurgerOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Бургер-меню для мобильных устройств */}
      {isBurgerOpen && (
        <div className="md:hidden w-full mt-4">
          <nav className="flex flex-col items-center space-y-4">
            <div className='flex'>
            <MdPhoneInTalk className='self-center mr-2' /> 
            <span className="text-lg font-bold">+7 (343) 364-44-60</span>
            </div>
            <a
              className="flex items-center bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300 w-full justify-center"
              href="https://wiki.yandex.ru/homepage/bazaznanijjkmk/support.-pervaja-linija/instrukcija-po-edinojj-forme-obrashhenija-v-sluzhb/"
            >
              Инструкция по Единой форме обращения
            </a>
            {user.isAuth && (
              <button
                className="flex items-center gap-2 bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300 w-full justify-center"
                onClick={handleLogoutClick}
              >
                <p>Выйти</p>
                <span><IoExitOutline /></span>
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Кнопки для десктопов */}
      {showButtons && (
        <nav className="hidden md:flex md:items-center md:space-x-4">
          <a
            className="flex items-center bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
            href="https://wiki.yandex.ru/homepage/bazaznanijjkmk/support.-pervaja-linija/instrukcija-po-edinojj-forme-obrashhenija-v-sluzhb/"
          >
            Инструкция по Единой форме обращения
          </a>
          {user.isAuth && (
            <button
              className="flex items-center gap-2 bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
              onClick={handleLogoutClick}
            >
              <p>Выйти</p>
              <span><IoExitOutline /></span>
            </button>
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