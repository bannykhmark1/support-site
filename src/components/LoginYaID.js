  import React, { useEffect } from 'react';

  function LoginYaID({ onAuthSuccess, yaAuth }) {
    useEffect(() => {
      if (window.YaAuthSuggest && yaAuth === false) {
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
          onAuthSuccess(data); // Передаем данные в App
        })
        .catch(error => {
          if (error.code !== 'in_progress') {
            console.error('Ошибка при инициализации Яндекс авторизации:', error);
          }
        });
      }
          console.log(data)
    }, [onAuthSuccess]);

    return (
      <div id="container"></div>
    );
  }

  export default LoginYaID;
