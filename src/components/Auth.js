import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { sendVerificationCode, verifyCodeAPI, setNewPasswordAPI, checkPasswordStatusAPI, loginWithPasswordAPI } from '../http/userAPI'; // Добавляем loginWithPasswordAPI 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = observer(({ setAuthState }) => {  // Передаем setAuthState через пропс
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  // Поле для пароля
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [authMethod, setAuthMethod] = useState('code');
    const [skipPasswordStep, setSkipPasswordStep] = useState(false);
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
                localStorage.setItem('token', data.token);  // Сохраняем токен
                const passwordStatus = await checkPasswordStatusAPI(email);
                if (!passwordStatus.hasPermanentPassword) {
                    toast.success('Код успешно проверен! Установите новый пароль или пропустите шаг.');
                    setPasswordRequired(true);
                } else {
                    toast.success('Код успешно проверен! Вы успешно вошли.');
                    setAuthState(true);  // Обновляем authState через пропс
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
            setAuthState(true);  // Обновляем authState через пропс
            navigate('/');
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при изменении пароля");
        }
    };

    // Вход по логину и паролю
    const handleLogin = async () => {
        try {
            const data = await loginWithPasswordAPI (email, password);  // Используем loginWithPasswordAPI  для входа
            if (data.token) {
                localStorage.setItem('token', data.token);  // Сохраняем токен
                setAuthState(true);  // Обновляем authState через пропс
                navigate('/');
            } else {
                toast.error("Ошибка при входе: токен не получен");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при входе");
        }
    };
    const handleSkipPasswordStep = () => {
        setSkipPasswordStep(true);
        setAuthState(true); // Устанавливаем состояние авторизации
        navigate('/'); // Перенаправляем на главную страницу
    };

    return (
        <div className='flex flex-col justify-between min-h-full'>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="flex items-center justify-center  h-full">
                <div className="w-full max-w-md p-8 border rounded shadow-lg shadow-[#dde7d7]">
                    <h2 className="text-2xl font-bold text-center">Авторизация</h2>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            className={`px-4 py-2 rounded ${authMethod === 'code' ? 'bg-[#dffd8d]' : 'bg-[#dde7d7]'}`}
                            onClick={() => setAuthMethod('code')}
                        >
                            Вход по коду
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${authMethod === 'password' ? 'bg-[#dffd8d]' : 'bg-[#dde7d7]'}`}
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
                                            className="flex bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
                                            onClick={handleVerifyCode}
                                        >
                                            Проверить код
                                        </button>
                                    </>
                                )}
                                {!isCodeSent && (
                                    <button
                                        className="flex bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
                                        onClick={handleSendCode}
                                    >
                                        Отправить код
                                    </button>
                                )}
                                {passwordRequired && isCodeVerified && (
                                    <>
                                        <input
                                            className="w-full px-3 py-2 border rounded border-[#dde7d7]"
                                            placeholder="Введите новый пароль..."
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            className="bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
                                            onClick={handleChangePassword}
                                        >
                                            Установить пароль
                                        </button>
                                        <button
                                            className="px-4 ml-4 py-2 bg-[#dde7d7] rounded hover:bg-[#d0dec7] transition shadow-md duration-300"
                                            onClick={handleSkipPasswordStep} // Кнопка для пропуска
                                        >
                                            Пропустить
                                        </button>
                                    </>
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
                                    type="password"
                                    placeholder="Введите ваш пароль..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button
                                    className="flex bg-[#dffd8d] text-[#02483A] font-bold py-2 px-4 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
                                    onClick={handleLogin}
                                >
                                    Войти
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;
