import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password, name) => {
    const { data } = await $host.post('api/user/registration', { email, password, name, role: 'USER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const fetchUserData = async () => {
    try {
        const response = await $host.get('/api/auth/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get(('api/user/auth'));
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const sendResetPasswordEmail = async (email) => {
    const { data } = await $host.post('api/user/requestPasswordReset', { email });
    return data;
};

export const resetPassword = async (token, password) => {
    try {

        const { data } = await $host.post('api/user/resetPassword', { token, newPassword: password });
        return data;
    } catch (error) {
        console.error('Ошибка при отправке запроса на сброс пароля:', error.response?.data || error.message);
        throw error;
    }
};