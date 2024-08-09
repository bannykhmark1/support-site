import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    if (window.YaAuthSuggest) {
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
        onAuthSuccess(data); // Передаем данные в App
      })
      .catch(error => {
        if (error.code !== 'in_progress') {
          console.error('Ошибка при инициализации Яндекс авторизации:', error);
        }
        // Если ошибка 'in_progress', мы её просто игнорируем и не выводим в консоль
      });
    }
  }, [onAuthSuccess]);

  return (
    <div id="container"></div>
  );
}

export default LoginYaID;
