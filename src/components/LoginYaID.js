import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess, yaAuth }) {
  useEffect(() => {
    if (yaAuth === false && window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/redirect',
        },
        'https://support.hobbs-it.ru/',
      )
      .then(({ handler }) => handler())
      .then(data => {
        localStorage.setItem('yandexToken', data.access_token); // Сохраняем токен в localStorage
        onAuthSuccess(data); // Передаем данные в App
      })
      .catch(error => {
        if (error.code !== 'in_progress') {
          console.error('Ошибка при инициализации Яндекс авторизации:', error);
        }
      });
    }
  }, [yaAuth, onAuthSuccess]);

  return (
    <div id="container"></div>
  );
}

export default LoginYaID;
