import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './index.css'; // если есть
import UserStore from './store/UserStore';

export const Context = createContext(null);

const AppWrapper = () => {
  const [userStore] = useState(new UserStore());

  useEffect(() => {
    userStore.restoreAuth();
  }, [userStore]);

  return (
    <Context.Provider value={{ user: userStore }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
