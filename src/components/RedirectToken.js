import React, { useEffect } from "react";

const RedirectToken = ({ onAuthSuccess }) => {
  YaSendSuggestToken(
    'https://support.hobbs-it.ru/', 
    {
       flag: true
    }
 )
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');

    if (token) {
      onAuthSuccess({ token });
    }
  }, [onAuthSuccess]);

  return <div>Авторизация завершена...</div>;
};

export default RedirectToken;
