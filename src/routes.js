import { createBrowserRouter } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, APP_ROUTE, RESET_PASSWORD_ROUTE, FORGOT_PASSWORD_ROUTE, ANNOUNCEMENTS_ROUTE, CREATE_ANNOUNCEMENT_ROUTE, EDIT_ANNOUNCEMENT_ROUTE } from "./utils/consts";
import Auth from "./components/Auth";
import App from "./App";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
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
        path: LOGIN_ROUTE,
        element: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth />
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        element: <ForgotPassword />
    },
    {
        path: RESET_PASSWORD_ROUTE,
        element: <ResetPassword />
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