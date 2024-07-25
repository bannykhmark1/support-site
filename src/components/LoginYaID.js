// src/components/LoginYaID.js

import React, { useEffect } from 'react';

const LoginYaID = ({ setIsYandexAuth }) => {
  useEffect(() => {
    const loadYaAuthScript = () => {
      // Проверка, загружен ли уже скрипт
      if (document.getElementById('ya-auth-script')) {
        initializeYaAuth();
        return;
      }

      const script = document.createElement('script');
      script.id = 'ya-auth-script'; // Устанавливаем id для проверки
      script.src = 'https://yastatic.net/s3/passport-sdk/autoload.js';
      script.onload = () => {
        initializeYaAuth();
      };
      script.onerror = () => {
        console.error('Ошибка при загрузке скрипта Яндекс Auth');
      };
      document.body.appendChild(script);
    };

    const initializeYaAuth = () => {
      if (window.YaAuthSuggest) {
        const oauthQueryParams = {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          redirect_uri: `${process.env.REACT_APP_API_URL}`,
          response_type: 'token',
        };
        const tokenPageOrigin = `${process.env.REACT_APP_API_URL}`;

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
          setIsYandexAuth(true);
        })
        .catch(error => console.error('Ошибка при инициализации Яндекс Auth', error));
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
