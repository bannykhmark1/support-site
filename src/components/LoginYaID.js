import React, { useEffect } from 'react';

function LoginYaID({ }) {
  useEffect(() => {
    YaAuthSuggest.init(
      {
         client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
         response_type: 'token',
         redirect_uri: 'https://support.hobbs-it.ru/redirect'
      },
      'https://support.hobbs-it.ru/'
   )
   .then(({
      handler
   }) => handler())
   .then(data => console.log('Сообщение с токеном', data))
   .catch(error => console.log('Обработка ошибки', error));

  }, );

  return <div id="container"></div>;
}

export default LoginYaID;
