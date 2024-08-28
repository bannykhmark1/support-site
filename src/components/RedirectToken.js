import React, { useEffect } from "react";

const RedirectToken = ({ onAuthSuccess }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');
    
    if (token) {
      fetch("https://login.yandex.ru/info?format=json", {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          if (userInfo) {
            onAuthSuccess({ access_token: token });
          } else {
            console.error("Не удалось получить информацию о пользователе.");
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении информации о пользователе:", error);
        });
    } else {
      console.error("Токен отсутствует в URL.");
    }
  }, [onAuthSuccess]);

  return <div></div>;
};

export default RedirectToken;
