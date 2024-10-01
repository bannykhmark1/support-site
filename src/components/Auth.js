import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { sendVerificationCode, verifyCodeAPI, setNewPasswordAPI, checkPasswordStatusAPI } from '../http/userAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = observer(() => {
    const { token } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [authMethod, setAuthMethod] = useState('code');
    const [passwordRequired, setPasswordRequired] = useState(false);

    // Отправка кода
    const handleSendCode = async () => {
        try {
            await sendVerificationCode(email);
            setIsCodeSent(true);
            toast.success('Код успешно отправлен на вашу почту!');
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при отправке кода");
        }
    };

    // Проверка кода
    const handleVerifyCode = async () => {
        try {
            const data = await verifyCodeAPI(email, code);
            if (data.token) {
                const passwordStatus = await checkPasswordStatusAPI(email);
                if (!passwordStatus.hasPermanentPassword) {
                    toast.success('Код успешно проверен! Установите новый пароль или пропустите шаг.');
                    setPasswordRequired(true);
                } else {
                    toast.success('Код успешно проверен! Вы успешно вошли.');
                    navigate('/');
                }
                setIsCodeVerified(true);
            } else {
                toast.error("Ошибка при проверке кода: токен не получен");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при проверке кода");
        }
    };

    // Установка нового пароля
    const handleChangePassword = async () => {
        try {
            await setNewPasswordAPI(email, newPassword);
            toast.success('Пароль успешно установлен!');
            navigate('/');
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при изменении пароля");
        }
    };

    // Пропуск установки пароля
    const handleSkipPassword = () => {
        toast.info('Пропуск установки пароля.');
        navigate('/');
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
                                    <>
                                        <input
                                            className="w-full px-3 py-2 border rounded"
                                            placeholder="Введите код..."
                                            value={code}
                                            onChange={e => setCode(e.target.value)}
                                        />
                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                            onClick={handleVerifyCode}
                                        >
                                            Проверить код
                                        </button>
                                    </>
                                )}
                                {!isCodeSent && (
                                    <button
                                        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                        onClick={handleSendCode}
                                    >
                                        Отправить код
                                    </button>
                                )}
                                {passwordRequired && isCodeVerified && (
                                    <>
                                        <input
                                            className="w-full px-3 py-2 border rounded"
                                            placeholder="Введите новый пароль..."
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                            onClick={handleChangePassword}
                                        >
                                            Установить пароль
                                        </button>
                                        <button
                                            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 mt-2"
                                            onClick={handleSkipPassword}
                                        >
                                            Пропустить
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;
