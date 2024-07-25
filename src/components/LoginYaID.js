// src/components/LoginYaID.js

import React, { useEffect } from 'react';

const LoginYaID = ({ setIsYandexAuth }) => {
  useEffect(() => {
    const loadYaAuthScript = () => {
      const script = document.createElement('script');
      script.src = 'https://yastatic.net/s3/passport-sdk/autoload.js';
      script.onload = () => {
        initializeYaAuth();
      };
      document.body.appendChild(script);
    };

    const initializeYaAuth = () => {
      if (window.YaAuthSuggest) {
        const oauthQueryParams = {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID, // Используем переменные окружения
          redirect_uri: `${process.env.REACT_APP_API_URL}/auth/callback`, // Замените на ваш URI, если он другой
          response_type: 'token',
        };
        const tokenPageOrigin = `${process.env.REACT_APP_API_URL}/auth/callback`; // Замените на ваш URI, если он другой

        window.YaAuthSuggest.init(
          oauthQueryParams,
          tokenPageOrigin,
          {
            view: 'button',
            parentId: 'buttonContainer',
            buttonSize: 'm',
            buttonView: 'main',
            buttonTheme: 'light',
            buttonBorderRadius: '0',
            buttonIcon: 'ya',
          }
        )
        .then(({ handler }) => handler())
        .then(data => {
          console.log('Сообщение с токеном', data);
          setIsYandexAuth(true); // Обновляем состояние после успешной авторизации
        })
        .catch(error => console.error('Обработка ошибки', error));
      } else {
        console.error('YaAuthSuggest не загружен');
      }
    };

    loadYaAuthScript();
  }, [setIsYandexAuth]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="buttonContainer" className="p-4">
        {/* Кнопка будет инициализирована и вставлена здесь скриптом */}
      </div>
    </div>
  );
};

export default LoginYaID;
