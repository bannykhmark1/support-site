import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RedirectToken = (props) => {
  console.log(props)
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1));
    const token = params.get('access_token');

    if (token) {
      // Убедитесь, что props.onAuthSucces определена и является функцией
      if (typeof props.onAuthSucces === 'function') {
        props.onAuthSucces({ token });
      } else {
        console.error('props.onAuthSucces is not defined or not a function');
      }
    }
  }, [location, props.onAuthSucces]);

  return <div>Авторизация завершена...</div>;
};

export default RedirectToken;
