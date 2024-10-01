import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNewPasswordAPI } from '../http/userAPI';
import { toast } from 'react-toastify';

const SetNewPassword = ({ email }) => {
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSetNewPassword = async () => {
        try {
            await setNewPasswordAPI(email, newPassword);
            toast.success('Пароль успешно изменен');
            navigate('/');  // После успешной установки пароля
        } catch (e) {
            toast.error(e.response?.data?.message || "Ошибка при установке пароля");
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold text-center">Установка нового пароля</h2>
            <input
                type="password"
                className="w-full px-3 py-2 border rounded mt-4"
                placeholder="Введите новый пароль"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
            />
            <button
                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleSetNewPassword}
            >
                Установить пароль
            </button>
        </div>
    );
};

export default SetNewPassword;
