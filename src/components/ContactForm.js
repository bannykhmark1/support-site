import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactForm = () => {
  const subject = encodeURIComponent("Вопрос");
  const body = encodeURIComponent("");
  const yandexMailUrl = `https://mail.yandex.ru/compose?mailto=112@hobbs-it.ru&subject=${subject}&body=${body}`;

  return (
    <div className="md:w-2/5 mt-10">
      <div className="flex text-center md:justify-start justify-center mx-auto items-center mb-6">
        <h2 className="md:text-3xl mb-1 text-2xl font-bold text-[#02483A]">Написать в поддержку</h2>
      </div>
      <div className= "bg-white shadow-lg rounded-lg p-6 mb-6">
        <p className="text-lg mb-4 text-[#02483A]">Выберите удобный способ для связи с нами:</p>
        <div className="space-y-6">
          <a
            href="https://forms.yandex.ru/cloud/666c170884227c1e4fa77f95/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
          >
            <img src="ya-logo.png" alt="Логотип" className="mr-3 w-6" />
            Подать обращение через Яндекс Форму
          </a>
          <a
            href={yandexMailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
          >
            <MdEmail className="w-6 h-6 mr-3" />
            Подать обращение по почте
          </a>
          <a
            href="https://t.me/uagtrackertestbot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
          >
            <FaTelegramPlane className="w-6 h-6 mr-3" />
            Подать обращение через Телеграм
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;