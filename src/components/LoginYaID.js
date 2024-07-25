import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://yastatic.net/s3/passport-sdk/autoload.js';
      script.onload = () => {
        console.log('YaAuthSuggest скрипт загружен');
        initializeYaAuth();
      };
      script.onerror = () => {
        console.error('Не удалось загрузить скрипт YaAuthSuggest');
      };
      document.body.appendChild(script);
    };

    const initializeYaAuth = () => {
      if (window.YaAuthSuggest) {
        console.log('YaAuthSuggest доступен');
        
        const oauthQueryParams = {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/auth/yandex/callback' // Убедитесь, что это правильный URI
        };
        const tokenPageOrigin = 'https://support.hobbs-it.ru/auth/yandex/callback'; // Убедитесь, что это правильный URI

        window.YaAuthSuggest.init(
          oauthQueryParams,
          tokenPageOrigin,
          {
            view: "button",
            parentId: "buttonContainer", // Убедитесь, что ID совпадает с вашим элементом
            buttonSize: 'm',
            buttonView: 'main',
            buttonTheme: 'light',
            buttonBorderRadius: "0",
            buttonIcon: 'ya',
          }
        )
        .then(({ handler }) => {
          console.log('Кнопка инициализирована');
          handler();
        })
        .then(data => console.log('Сообщение с токеном', data))
        .catch(error => console.error('Обработка ошибки', error));
      } else {
        console.error('YaAuthSuggest не доступен');
      }
    };

    loadScript();
  }, []);

  return (
    <div>
      <div id="buttonContainer" style={{ margin: '20px', textAlign: 'center' }}>
        {/* Кнопка авторизации будет добавлена здесь */}
      </div>
    </div>
  );
}

export default App;
