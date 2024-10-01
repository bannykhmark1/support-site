import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { sendVerificationCode, verifyCodeAPI, loginWithPasswordAPI, checkPasswordStatusAPI } from '../http/userAPI';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Код компонента Auth
const Auth = observer(({ onLogin, setAuthState }) => {
    const { token } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [hasPermanentPassword, setHasPermanentPassword] = useState(false);

    useEffect(() => {
        const checkPasswordStatus = async () => {
            try {
                const data = await checkPasswordStatusAPI(email);
                setHasPermanentPassword(data.hasPermanentPassword);
            } catch (e) {
                console.log('Ошибка проверки статуса пароля:', e.response?.data?.message || e.message);
            }
        };

        if (email) checkPasswordStatus();
    }, [email]);

    const handleSendCode = async () => {
        try {
            await sendVerificationCode(email);
            setIsCodeSent(true);
            toast.success('Код успешно отправлен на вашу почту!');
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
        }
    };
    
    const handleVerifyCode = async () => {
        try {
            const data = await verifyCodeAPI(email, code);
            setAuthState(data.token);
            token.setToken(data.token);
            navigate('/');
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
        }
    };
    
    const handleLogin = async () => {
        try {
            const data = await loginWithPasswordAPI(email, password);
            setAuthState(data.token);
            token.setToken(data.token);
            navigate('/');
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
        }
    };
    
    return (
        <div>
            <h1>Авторизация</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {isCodeSent && (
                <>
                    <input
                        type="text"
                        placeholder="Код верификации"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={handleVerifyCode}>Подтвердить код</button>
                </>
            )}
            {!isCodeSent && !hasPermanentPassword && (
                <button onClick={handleSendCode}>Отправить код</button>
            )}
            {hasPermanentPassword && (
                <>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Войти</button>
                </>
            )}
            <ToastContainer />
        </div>
    );
});

export default Auth;    