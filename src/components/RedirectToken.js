import React, { useEffect } from "react";

const RedirectToken = ({ onAuthSuccess }) => {
  useEffect(() => {
    YaSendSuggestToken(
      'https://support.hobbs-it.ru/', 
      {
         flag: true
      }
    );

    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');

    if (token) {
      onAuthSuccess({ access_token: token });
    }
  }, [onAuthSuccess]);

  return <div></div>;
};

export default RedirectToken;
