import React from 'react';

const Feedback = () => {
  const handleClick = () => {
    window.open('https://forms.yandex.ru/cloud/66a7693543f74f643a391a55/', '_blank');
  };

  return (
    <div className="w-full h-full p-4">
      <button
        onClick={handleClick}
        className="flex w-full bg-[#dffd8d] text-[#02483A] font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#c5d3bc] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#02483A] focus:ring-opacity-50"
      >
        <p className="mx-auto flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Поделиться идеей по улучшению сайта
        </p>
      </button>
    </div>
  );
};

export default Feedback;