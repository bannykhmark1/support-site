import { $host } from "./index";

// Отправка кода верификации на email
export const sendVerificationCode = async (email) => {
    try {
        const { data } = await $host.post('/api/user/sendCode', { email });
        return data;
    } catch (error) {
        console.error('Error sending verification code:', error.response?.data || error.message);
        throw error;
    }
};

// Проверка кода верификации
export const verifyCodeAPI = async (email, code) => {
    try {
        const { data } = await $host.post('/api/user/verifyCode', { email, code });
        return data;
    } catch (error) {
        console.error('Error verifying code:', error.response?.data || error.message);
        throw error;
    }
};

// Установка нового пароля
export const setNewPasswordAPI = async (email, newPassword) => {
    try {
        const { data } = await $host.post('/api/user/setNewPassword', { email, newPassword });
        return data;
    } catch (error) {
        console.error('Error setting new password:', error.response?.data || error.message);
        throw error;
    }
};

// Проверка статуса пароля (есть ли постоянный пароль)
export const checkPasswordStatusAPI = async (email) => {
    try {
        const { data } = await $host.post('/api/user/checkPasswordStatus', { email });
        return data;
    } catch (error) {
        console.error('Error checking password status:', error.response?.data || error.message);
        throw error;
    }
};

// Логин с паролем
export const loginWithPasswordAPI = async (email, password) => {
    try {
        const { data } = await $host.post('/api/user/loginWithPassword', { email, password });
        return data;
    } catch (error) {
        console.error('Error logging in with password:', error.response?.data || error.message);
        throw error;
    }
};
