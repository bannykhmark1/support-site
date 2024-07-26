import React, { useEffect } from 'react';

function LoginYaID({ onAuthSuccess }) {
  useEffect(() => {
    const initializeYandexAuth = async () => {
      if (window.YaAuthSuggest && !window.yandexAuthInitialized) {
        try {
          const { handler } = await window.YaAuthSuggest.init(
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
          );

          window.yandexAuthHandler = handler;
          window.yandexAuthInitialized = true;
        } catch (error) {
          if (error.code !== 'in_progress') {
            console.log('Ошибка при инициализации Яндекс авторизации:', error);
          }
        }
      }
    };

    initializeYandexAuth();
  }, [onAuthSuccess]);

  const openAuthWindow = () => {
    if (window.yandexAuthHandler) {
      const authWindow = window.open(
        '',
        'YandexAuth',
        'width=500,height=600'
      );
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
