import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './index.css'; // если есть
import UserStore from './store/UserStore';
export const Context = createContext(null);

let root = document.getElementById('root');


ReactDOM.createRoot(root).render(
  <Context.Provider value={{
    user: new UserStore(),
  }}>
    <React.StrictMode>
      <RouterProvider router={router} /> {/* Router управляет рендерингом */}
    </React.StrictMode>
  </Context.Provider>
);