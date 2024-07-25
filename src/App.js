import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    
    if (code) {
      // Отправляем код на сервер для обмена на токен
      axios.post('/api/auth/yandex', { code })
        .then(response => {
          // Обработка успешного ответа
          console.log('Данные пользователя:', response.data);
          setIsAuth(true);
          // Сохраните токен в localStorage или в контексте, если это необходимо
        })
        .catch(error => {
          console.error('Ошибка при отправке кода на сервер:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Мой сайт</h1>
      {isAuth ? (
        <p>Добро пожаловать!</p>
      ) : (
        <LoginYaID />
      )}
    </div>
  );
};

export default App;
