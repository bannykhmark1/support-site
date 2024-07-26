import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/redirect'
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
        window.yandexAuthHandler = handler;
      })
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, [onAuthSuccess]);

  const openAuthWindow = () => {
    const authWindow = window.open(
      '',
      'YandexAuth',
      'width=500,height=600'
    );
    if (window.yandexAuthHandler) {
      window.yandexAuthHandler(() => {
        authWindow.location.href = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=' + process.env.REACT_APP_YANDEX_CLIENT_ID + '&redirect_uri=https://support.hobbs-it.ru/redirect';
      });
    }
  };

  return (
    <div id="container">
      <button onClick={openAuthWindow} className="bg-blue-500 text-white px-4 py-2 rounded">
        Войти с Яндекс ID
      </button>
    </div>
  );
}

export default LoginYaID;
