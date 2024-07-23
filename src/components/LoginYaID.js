import React from 'react';

const LoginYaID = () => {
  const handleLogin = () => {
    window.location.href = 'https://support.hobbs-it.ru/api/auth/yandex';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogin}
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
