import React, { useEffect } from 'react';

const RedirectToken = () => {
  useEffect(() => {
    const handleToken = () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const token = params.get('access_token');

      // Если токен найден, сохраняем его в localStorage
      if (token) {
        localStorage.setItem('yandexToken', token);
        console.log('Получен токен: ', token);
      }
    };

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js'; // Замените на реальный URL скрипта, если требуется
      script.onload = handleToken; // Вызываем функцию обработки токена, когда скрипт загружен
      document.body.appendChild(script);
    };

    loadScript(); // Загружаем скрипт

    // Очистка при размонтировании компонента
    return () => {
      const script = document.querySelector('script[src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div></div>; // Технический компонент, UI не нужен
};

export default RedirectToken;
