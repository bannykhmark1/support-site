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
        const authWindow = window.open(
          '',
          'YandexAuth',
          'width=500,height=600'
        );
        handler(() => {
          authWindow.location.href = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=' + process.env.REACT_APP_YANDEX_CLIENT_ID + '&redirect_uri=https://support.hobbs-it.ru/redirect';
        });
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, [onAuthSuccess]);

  return (
    <div id="container"></div>
  );
}

export default LoginYaID;
