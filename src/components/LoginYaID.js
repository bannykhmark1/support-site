import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    const token = localStorage.getItem('yandexToken');

    // Если токен уже существует, пропускаем инициализацию
    if (!token && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,  // Ваш CLIENT_ID из настроек приложения Яндекс
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/redirect',  // URL для редиректа
        },
        'https://support.hobbs-it.ru/',  // URL сайта
        {
          view: 'button',  // Виджет с кнопкой
          parentId: 'container',  // ID элемента, в который будет вставлен виджет
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0,
        }
      )
      .then(({ handler }) => {
        return handler();
      })
      .then(data => {
        // Если авторизация прошла успешно, передаем данные наверх
        onAuthSuccess(data);
      })
      .catch(error => {
        console.error('Ошибка при инициализации Яндекс авторизации:', error);
      });
    }
  }, [onAuthSuccess]);

  return (
    <div id="container"></div>  // Контейнер для виджета Яндекс авторизации
  );
}

export default LoginYaID;
