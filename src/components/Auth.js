import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { jwtDecode } from 'jwt-decode';
import { sendVerificationCode, verifyCodeAPI } from '../http/userAPI';

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
        } catch (e) {
            alert(e.response?.data?.message || "Ошибка при отправке кода");
        }
    };

    const handleVerifyCode = async () => {
        try {
            const data = await verifyCodeAPI(email, code);
       
            console.log('Data received from server:', data); // Логирование ответа
            
            if (data.token) { // Проверяем, есть ли токен в ответе
                setAuthState(true); // Обновляем состояние авторизации в App
                localStorage.setItem('token', data.token); // Сохраняем токен в localStorage
                
                if (onLogin) onLogin(); // Вызовем onLogin для обновления состояния в App
                navigate('/');
            } else {
                alert("Ошибка при проверке кода: токен не получен");
            }
        } catch (e) {
            console.error('Error caught:', e); // Логирование ошибки
            alert(e.response?.data?.message || "Ошибка при проверке кода");
        }
    };

    return (
        <div className='flex flex-col justify-between h-screen'>
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
                    <h2 className="text-2xl font-bold text-center">Авторизация</h2>
                    <div className="mt-6 space-y-4">
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
