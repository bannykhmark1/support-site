import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div>
      <div className="text-center mb-4 md:mb-0 md:mr-4">
        <a href="mailto:ваша_почта@example.com" className="text-blue-500 hover:underline">Написать нам на почту</a>
      </div>
      <div className="text-center mb-4 md:mb-0 md:mr-4">
        <p className="text-gray-700">Звонок в ТП 8 800 ------</p>
      </div>
      <div className="text-center mb-4 md:mb-0 md:mr-4">
        <a href="https://t.me/uagtrackertestbot" className="text-blue-500 hover:underline flex items-center">
          <FaTelegramPlane className="mr-2" /> Написать в Телеграм
        </a>
      </div>
      </div>
      <div className="text-center">
        <div className="border p-4 rounded-lg bg-gray-50 shadow-md">
          <p className="font-semibold">Диалог с поддержкой</p>
          <p className="text-sm text-gray-600">(только в момент, когда будут сотрудники 1 линии ТП)</p>
          <div className="border mt-2 p-2 rounded bg-white shadow-inner">
            <p>Окно обращения в поддержку</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
