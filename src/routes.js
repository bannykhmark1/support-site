import { createBrowserRouter } from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, APP_ROUTE, RESET_PASSWORD_ROUTE, FORGOT_PASSWORD_ROUTE} from "./utils/consts";
import Auth from "./components/Auth";
import App from "./App";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


export const authRoutes = [

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
];


export const router = createBrowserRouter([
    ...authRoutes,
    ...publicRoutes,
])