import React from 'react';

const ContactForm = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Обратная связь</h2>
      <p>Вы можете заполнить Яндекс Форму напрямую в Трекер для заведения задачи по вашему вопросу</p>
      <iframe
        src="https://forms.yandex.ru/cloud/666c170884227c1e4fa77f95"
        width="100%"
        height="660px"
        frameBorder="0"
        className="mt-4 rounded-lg"
      ></iframe>
    </section>
  );
};

export default ContactForm;
