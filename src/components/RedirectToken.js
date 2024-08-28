import React, { useEffect } from "react";

const RedirectToken = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');
    if (token) {
      localStorage.setItem('yandexToken', token); // Сохраняем токен в localStorage
      window.location.hash = ''; // Очищаем hash из URL
    }
  }, []);

  return <div></div>;
};

export default RedirectToken;
