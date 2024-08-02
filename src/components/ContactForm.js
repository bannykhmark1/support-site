import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const ContactForm = () => {
  const subject = encodeURIComponent("Support Request");
  const body = encodeURIComponent("");
   const yandexMailUrl = `https://mail.yandex.ru/compose?mailto=do_support@kurganmk.ru&subject=${subject}&body=${body}`;

  return (
    
    <div className="max-w-4xl mx-auto mt-10 p-4">
<div className="flex justify-between items-center mb-6">
<h2 className="text-3xl font-bold text-gray-800">Написать в поддержку</h2>
       
      </div>
      <div className="bg-white shadow-lg w rounded-lg p-6 mb-6">
      <p className="text-lg mb-4">Выберите удобный способ для связи с нами:</p>
      <div className="space-y-6">
        <a
          href="https://forms.yandex.ru/cloud/666c170884227c1e4fa77f95/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex  items-center bg-yellow-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
        >
          <img src="ya-logo.png" alt="Логотип" className="mr-3 w-6" />
          Подать обращение через Яндекс Форму
      
        
        </a>
        <a
          href={yandexMailUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center bg-red-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition duration-300"
        >
          <MdEmail className="w-6 h-6 mr-3" />
          Подать обращение по почте
        </a>

        <a
          href="https://t.me/uagtrackertestbot"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
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
