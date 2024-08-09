import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    const token = localStorage.getItem('yandexToken');

    if (!token && window.YaAuthSuggest) {  // Инициализация происходит только если токена нет и библиотека загружена
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/redirect',
        },
        'https://support.hobbs-it.ru/',
        {
          view: 'button',
          parentId: 'container',
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
        onAuthSuccess(data);
      })
      .catch(error => {
        console.error('Ошибка при инициализации Яндекс авторизации:', error);
      });
    }
  }, [onAuthSuccess]);

  return (
    <div id="container"></div>
  );
}

export default LoginYaID;
