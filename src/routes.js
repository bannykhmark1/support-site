import { createBrowserRouter } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, APP_ROUTE, ANNOUNCEMENTS_ROUTE, CREATE_ANNOUNCEMENT_ROUTE, EDIT_ANNOUNCEMENT_ROUTE } from "./utils/consts";
import Auth from "./components/Auth";
import App from "./App";

import CreateAnnouncement from "./components/CreateAnnouncement";
import ListAnnouncement from "./components/ListAnnouncement";
import EditAnnouncement from "./components/EditAnnouncement";
import LoginYaID from "./components/LoginYaID";

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
  {
    path: '/login-yaid',
    element: <LoginYaID />
  }
]);
