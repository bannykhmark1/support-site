import React from 'react';

function LoginYaID({ setIsYandexAuth }) {
  const handleYandexLogin = () => {
    window.location.href = '/auth/yandex/login';
  };

  return (
    <div className="text-center">
      <button onClick={handleYandexLogin} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
        Login with Yandex ID
      </button>
    </div>
  );
}

export default LoginYaID;
