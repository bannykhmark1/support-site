import React from "react";
import { FaTelegramPlane } from "react-icons/fa";

const ContactInfo = () => {
const subject = encodeURIComponent("Support Request");
  const body = encodeURIComponent("");
  const yandexMailUrl = `https://mail.yandex.com/compose?mailto=do_support@kurganmk.ru&subject=${subject}&body=${body}`;
  
  return (
    <section className="flex flex-col md:flex-row justify-between items-center mt-8">
      <div className="text-center mb-4 md:mb-0 md:mr-4">
        <a
          href="https://t.me/uagtrackertestbot"
          className="text-blue-500 hover:underline flex items-center"
        >
          <FaTelegramPlane className="mr-2" /> Написать в Телеграм
        </a>
      </div>
      <div className="text-center mb-4 md:mb-0 md:mr-4">
        <a
          href={yandexMailUrl} target="_blank" rel="noopener noreferrer">
          className="text-blue-500 hover:underline"
        >
          Написать нам на почту
        </a>
      </div>
      <div>
        <div className="text-center mb-4 md:mb-0 md:mr-4">
          <p className="text-gray-700">Звонок в ТП 8 800 ------</p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
