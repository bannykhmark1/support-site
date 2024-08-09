import React, { useEffect } from 'react';

function LoginYaID() {
  useEffect(() => {
    const token = localStorage.getItem('yandexToken');

    // Если токен уже существует, пропускаем инициализацию
    if (!token && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID, // Ваш CLIENT_ID из настроек приложения Яндекс
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/redirect', // URL для редиректа
        },
        'https://support.hobbs-it.ru/', // URL сайта
        {
          view: 'button', // Виджет с кнопкой
          parentId: 'container', // ID элемента, в который будет вставлен виджет
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0,
        }
      )
      .then(({ handler }) => handler())
      .then(data => {
        // Сохраняем токен в localStorage
        localStorage.setItem('yandexToken', data.token);
        console.log('Сообщение с токеном: ', data);
      })
      .catch(error => {
        console.error('Ошибка при инициализации Яндекс авторизации:', error);
      });
    }
    
    // Добавляем и удаляем скрипт при монтировании и размонтировании компонента
    const script = document.createElement('script');
    script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="container"></div> // Контейнер для виджета Яндекс авторизации
  );
}

export default LoginYaID;
