import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { sendVerificationCode, verifyCodeAPI } from '../http/userAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = observer(({ onLogin, setAuthState }) => {
    const { token } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

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
                setAuthState(true);
                window.location.reload();
                localStorage.setItem('token', data.token);
                if (onLogin) onLogin();
                navigate('/');
            } else {
                toast.error("Ошибка при проверке кода: токен не получен");
            }
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при проверке кода");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (isCodeSent) {
                handleVerifyCode();
            } else {
                handleSendCode();
            }
        }
    };

    return (
        <div className='flex flex-col justify-between min-h-full'>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                    <h2 className="text-2xl font-bold text-center">Авторизация</h2>
                    <div className="mt-6 space-y-4">
                        <input
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {isCodeSent && (
                            <input
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Введите код..."
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        )}
                        <div className="flex items-center justify-between mt-4">
                            {!isCodeSent ? (
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                    onClick={handleSendCode}
                                >
                                    Отправить код
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                    onClick={handleVerifyCode}
                                >
                                    Войти
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;
