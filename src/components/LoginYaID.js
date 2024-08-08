import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    const initYaAuth = () => {
      if (window.YaAuthSuggest) {
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
    };

    // Удаление предыдущего виджета, если он есть
    const container = document.getElementById('container');
    if (container) {
      container.innerHTML = '';
    }

    initYaAuth();

    return () => {
      // Очищаем контейнер при размонтировании компонента
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [onAuthSuccess]);

  return (
    <div id="container"></div>
  );
}

export default LoginYaID;
