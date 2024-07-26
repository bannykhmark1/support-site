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
      .then(({ handler }) => {
        document.getElementById('container').addEventListener('click', () => {
          const authUrl = handler();
          window.open(authUrl, '_blank');
        });
      })
      .catch(error => {
        console.error('Ошибка при инициализации виджета авторизации:', error);
      });
    }
  }, [onAuthSuccess]);

  return (
    <div id="container"></div>
  );
}

export default LoginYaID;
