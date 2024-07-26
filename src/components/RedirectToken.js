import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectToken = ({ onAuthSuccess }) => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1));
    const token = params.get('access_token');

    if (token) {
      // Убедитесь, что onAuthSuccess определена и является функцией
      if (typeof onAuthSuccess === 'function') {
        onAuthSuccess({ token });
      } else {
        console.error('onAuthSuccess is not defined or not a function');
      }
    }
  }, [location, onAuthSuccess]);

  return <div>Авторизация завершена...</div>;
};

export default RedirectToken;
