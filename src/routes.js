import { createBrowserRouter } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, APP_ROUTE, ANNOUNCEMENTS_ROUTE, CREATE_ANNOUNCEMENT_ROUTE, EDIT_ANNOUNCEMENT_ROUTE, REDIRECT_TOKEN, SET_NEW_PASSWORD } from "./utils/consts";
import Auth from "./components/Auth";
import App from "./App";

import SetNewPassword from "./components/SetNewPassword";
import CreateAnnouncement from "./components/CreateAnnouncement";
import ListAnnouncement from "./components/ListAnnouncement";
import EditAnnouncement from "./components/EditAnnouncement";

export const authRoutes = [
  {
    path: CREATE_ANNOUNCEMENT_ROUTE,
    element: <CreateAnnouncement />
  },
  {
    path: EDIT_ANNOUNCEMENT_ROUTE,
    element: <EditAnnouncement />
  },
];

export const publicRoutes = [

  {
    path: APP_ROUTE,
    element: <App />
  },
  {
    path: SET_NEW_PASSWORD,  // Сброс пароля через токен
    element: <SetNewPassword />
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />
  },

  {
    path: ANNOUNCEMENTS_ROUTE,
    element: <ListAnnouncement />
  },
];

export const router = createBrowserRouter([
  ...authRoutes,
  ...publicRoutes,
]);
