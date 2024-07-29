import React from 'react';

const Feedback = () => {
  const handleClick = () => {
    window.open('https://forms.yandex.ru/cloud/66a7693543f74f643a391a55/', '_blank');
  };

  return (
    <div className="bg-gray-600 w-full h-full shadow-lg rounded-lg ">
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-white font-bold py-2 px-6 w-full rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
    >
      Поделиться идеей по улучшению сайта
    </button>
    </div>
  );
};

export default Feedback;
