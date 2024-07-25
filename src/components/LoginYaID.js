// src/components/LoginYaID.js

import React, { useEffect } from 'react';

const LoginYaID = ({ setIsYandexAuth, setIsValidUser }) => {
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
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          redirect_uri: process.env.REACT_APP_AUTH_REDIRECT_URI,
          response_type: 'token',
        };

        window.YaAuthSuggest.init(
          oauthQueryParams,
          process.env.REACT_APP_AUTH_REDIRECT_URI,
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
          // Устанавливаем состояние авторизации
          setIsYandexAuth(true);
          // Сохраняем токен и проверяем пользователя
          fetchUserProfile(data.access_token);
        })
        .catch(error => console.error('Обработка ошибки', error));
      } else {
        console.error('YaAuthSuggest не загружен');
      }
    };

    const fetchUserProfile = (token) => {
      fetch('https://login.yandex.ru/info?format=json', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        const emailDomain = data.default_email.split('@')[1];
        const allowedDomains = ['kurganmk', 'reftp', 'hobbs-it'];

        if (allowedDomains.includes(emailDomain)) {
          setIsValidUser(true);
        } else {
          setIsValidUser(false);
        }
      })
      .catch(error => console.error('Ошибка при получении данных пользователя', error));
    };

    loadYaAuthScript();
  }, [setIsYandexAuth, setIsValidUser]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="buttonContainer" className="p-4">
        {/* Кнопка будет инициализирована и вставлена здесь скриптом */}
      </div>
    </div>
  );
};

export default LoginYaID;
