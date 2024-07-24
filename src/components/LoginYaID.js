import React from 'react';

const LoginYaID = ({ setIsYandexAuth }) => {
  const redirectToYandex = () => {
    const redirectUri = encodeURIComponent('https://support.hobbs-it.ru/');
    const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${process.env.REACT_APP_YANDEX_CLIENT_ID}&redirect_uri=${redirectUri}`;
    window.location.href = yandexAuthUrl;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       {console.log(isYandexAuth)}
      <button
        onClick={redirectToYandex}
        className="flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition-colors duration-300"
      >
        <img
          src="yandex.svg"
          alt="Yandex logo"
          className="w-6 h-6 mr-2"
        />
        Войти с Яндекс ID
      </button>
    </div>
  );
};

export default LoginYaID;
