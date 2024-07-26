import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/'
        },
        'https://support.hobbs-it.ru/redirect',
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
        console.log('Сообщение с токеном', data);
        onAuthSuccess(data); // Передаем данные в App
        console.log(data)
      })
      .catch(error => {
        console.error('Ошибка авторизации:', error);
      });
    }
  }, [onAuthSuccess]);

  return (
    <div id="container">
      {/* Здесь будет кнопка авторизации Яндекс */}
    </div>
  );
}

export default LoginYaID;
