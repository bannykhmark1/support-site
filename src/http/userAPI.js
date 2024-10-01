import { $host } from "./index";

export const sendVerificationCode = async (email) => {
    try {
        const { data } = await $host.post('/api/user/sendCode', { email });
        return data;
    } catch (error) {
        console.error('Error sending verification code:', error.response?.data || error.message);
        throw error;
    }
};

export const verifyCodeAPI = async (email, code) => {
    try {
        const { data } = await $host.post('/api/user/verifyCode', { email, code });
        return data;
    } catch (error) {
        console.error('Error verifying code:', error.response?.data || error.message);
        throw error;
    }
};

export const changePasswordAPI = async (newPassword) => {
    try {
        const { data } = await $authHost.post('/api/user/changePassword', { newPassword });
        return data;
    } catch (error) {
        console.error('Error changing password:', error.response?.data || error.message);
        throw error;
    }
}

// Другие функции, такие как login, registration, и т.д. остаются без изменений
