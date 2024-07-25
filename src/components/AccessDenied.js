import React from 'react';

const AccessDenied = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>Вы не можете получить доступ к этому сайту. Ваш почтовый домен не разрешён.</p>
      </div>
    </div>
  );
};

export default AccessDenied;
