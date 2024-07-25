
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthCallback = ({ setIsYandexAuth, setIsValidUser }) => {
  const history = useHistory();

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
      fetchUserProfile(accessToken);
    } else {
      console.error('Токен не найден');
    }
  }, [setIsYandexAuth, setIsValidUser, history]);

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
        setIsYandexAuth(true);
        setIsValidUser(true);
        history.push('/'); // Перенаправление на главную страницу
      } else {
        setIsYandexAuth(false);
        setIsValidUser(false);
        history.push('/access-denied'); // Перенаправление на страницу отказа
      }
    })
    .catch(error => {
      console.error('Ошибка при получении данных пользователя', error);
      setIsYandexAuth(false);
      setIsValidUser(false);
      history.push('/access-denied'); // Перенаправление на страницу отказа
    });
  };

  return <div>Авторизация...</div>;
};

export default AuthCallback;
