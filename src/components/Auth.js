import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { sendVerificationCode, verifyCodeAPI, setNewPasswordAPI, loginWithPasswordAPI, checkPasswordStatusAPI } from '../http/userAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = observer(({ onLogin, setAuthState }) => {
    const { token } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [authMethod, setAuthMethod] = useState('code');

    const handleSendCode = async () => {
        try {
            await sendVerificationCode(email);
            setIsCodeSent(true);
            toast.success('Код успешно отправлен на вашу почту!');
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при отправке кода");
        }
    };

    const handleVerifyCode = async () => {
        try {
            const data = await verifyCodeAPI(email, code);
            if (data.token) {
                const passwordStatus = await checkPasswordStatusAPI(email); // Проверка статуса пароля
                if (!passwordStatus.hasPermanentPassword) {
                    // Если пароля нет, предлагаем установить новый
                    toast.success('Код успешно проверен! Установите новый пароль.');
                } else {
                    // Если пароль есть, перенаправляем пользователя
                    toast.success('Код успешно проверен! Вы успешно вошли.');
                    navigate('/'); // Перенаправление на главную страницу
                }
                setIsCodeVerified(true);
            } else {
                toast.error("Ошибка при проверке кода: токен не получен");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при проверке кода");
        }
    };

    const handleChangePassword = async () => {
        try {
            await setNewPasswordAPI(email, newPassword);
            toast.success('Пароль успешно установлен!');
            navigate('/'); // Перенаправление на главную страницу
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при изменении пароля");
        }
    };

    const handleLogin = async () => {
        if (authMethod === 'code') {
            if (isCodeSent) {
                await handleVerifyCode();
            } else {
                await handleSendCode();
            }
        } else if (authMethod === 'password') {
            try {
                const data = await loginWithPasswordAPI(email, password);
                if (data.token) {
                    toast.success('Успешный вход!');
                    navigate('/'); // Перенаправление на главную страницу
                }
            } catch (e) {
                toast.error(e.response?.data?.message || "Ошибка при входе");
            }
        }
    };

    return (
        <div className='flex flex-col justify-between min-h-full'>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                    <h2 className="text-2xl font-bold text-center">Авторизация</h2>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button 
                            className={`px-4 py-2 rounded ${authMethod === 'code' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} 
                            onClick={() => setAuthMethod('code')}
                        >
                            Вход по коду
                        </button>
                        <button 
                            className={`px-4 py-2 rounded ${authMethod === 'password' ? 'bg-green-500 text-white' : 'bg-gray-200'}`} 
                            onClick={() => setAuthMethod('password')}
                        >
                            Вход по паролю
                        </button>
                    </div>
                    <div className="mt-6 space-y-4">
                        {authMethod === 'code' && (
                            <>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Введите ваш email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {isCodeSent && (
                                    <input
                                        className="w-full px-3 py-2 border rounded"
                                        placeholder="Введите код..."
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                    />
                                )}
                                {isCodeVerified && (
                                    <input
                                        className="w-full px-3 py-2 border rounded"
                                        placeholder="Введите новый пароль..."
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                )}
                            </>
                        )}

                        {authMethod === 'password' && (
                            <>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Введите ваш email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Введите пароль..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                            </>
                        )}

                        <div className="flex items-center justify-between mt-4">
                            <button
                                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                onClick={handleLogin}
                            >
                                {authMethod === 'code' ? (isCodeSent ? 'Проверить код' : 'Отправить код') : 'Войти'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;
