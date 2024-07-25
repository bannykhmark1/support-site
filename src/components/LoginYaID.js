// src/components/LoginYaID.js

import React, { useEffect } from 'react';


const LoginYaID = () => {

  window.YaAuthSuggest.init(
    {
      client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
      response_type: 'token',
      redirect_uri: 'https://support.hobbs-it.ru/'
   },
    "https://support.hobbs-it.ru/",
    {
      view: "button",
      parentId: "buttonContainerId",
      buttonSize: 'm',
      buttonView: 'main',
      buttonTheme: 'light',
      buttonBorderRadius: "0",
      buttonIcon: 'ya',
    }
  )
  .then(({handler}) => handler())
  .then(data => console.log('Сообщение с токеном', data))
  .catch(error => console.log('Обработка ошибки', error))

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div id="buttonContainer">

      </div>
    </div>
  );
};

export default LoginYaID;


