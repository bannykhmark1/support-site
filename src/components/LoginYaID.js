import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Ensure the Yandex Authentication script is available
    if (window.YaAuthSuggest) {
      window.YaAuthSuggest.init(
        {
          client_id: process.env.REACT_APP_YANDEX_CLIENT_ID,
          response_type: 'token',
          redirect_uri: 'https://support.hobbs-it.ru/'
        },
        'https://support.hobbs-it.ru/redirect',
        {
          view: 'button',
          parentId: 'container',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0
        }
      )
      .then(({ handler }) => handler())
      .then(data => console.log('Сообщение с токеном', data))
      .catch(error => console.log('Обработка ошибки', error));
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div id="container"></div>
  );
}

export default App;
