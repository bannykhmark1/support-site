import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/redirect/'
        },
        'https://support.hobbs-it.ru/',
        {
          view: 'button',
          parentId: 'container',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0
        }
      )
      .then(({ handler }) => handler())
      .then(data => {
        if (onAuthSuccess) {
          onAuthSuccess(data); // Передаем данные в App
        } else {
          console.error('onAuthSuccess is not defined');
        }
      })
      .catch(error => {
        if (error.code !== 'in_progress') {
          console.error('Ошибка при инициализации Яндекс авторизации:', error);
        }
      });
    }
  }, [onAuthSuccess]);

  return <div id="container"></div>;
}

export default LoginYaID;
