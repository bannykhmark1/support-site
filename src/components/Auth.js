import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, APP_ROUTE, FORGOT_PASSWORD_ROUTE, RESET_PASSWORD_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const isForgotPassword = location.pathname === FORGOT_PASSWORD_ROUTE;
    const isResetPassword = location.pathname === RESET_PASSWORD_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, name);
            }

            user.setUser(data);
            user.setIsAuth(true);

            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isAuth', 'true');

            navigate(APP_ROUTE);
        } catch (e) {
            if (e.response && e.response.data && e.response.data.message) {
                alert(e.response.data.message);
            } else {
                console.error(e);
            }
        }
    };

    return (
        <div className='flex flex-col justify-between '>

            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                    {isForgotPassword ? (
                        <ForgotPassword />
                    ) : isResetPassword ? (
                        <ResetPassword />
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-center">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                            <div className="mt-6 space-y-4">
                                {!isLogin && (
                                    <input
                                        className="w-full px-3 py-2 border rounded"
                                        placeholder="Введите ваше имя..."
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                )}
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Введите ваш email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Введите ваш пароль..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                                <div className="flex items-center justify-between mt-4">
                                    {isLogin ? (
                                        <div className="flex items-center space-x-2">
                                            <span>Нет аккаунта?</span>
                                            <NavLink to={REGISTRATION_ROUTE} className="text-blue-600 hover:underline">Зарегистрируйся!</NavLink>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <span>Есть аккаунт?</span>
                                            <NavLink to={LOGIN_ROUTE} className="text-blue-600 hover:underline">Войдите!</NavLink>
                                        </div>
                                    )}
                                    <button
                                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                        onClick={click}
                                    >
                                        {isLogin ? 'Войти' : 'Регистрация'}
                                    </button>
                                </div>
                                {isLogin && (
                                    <div className="flex items-center justify-end mt-2">
                                        <NavLink to={FORGOT_PASSWORD_ROUTE} className="text-blue-600 hover:underline">Забыли пароль?</NavLink>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
    
        </div>
    );
});

export default Auth;