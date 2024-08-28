import { $authHost, $host } from "./index";

// Создание объявления
export const createAnnouncement = async (title, description, date) => {
    const { data } = await $host.post('api/announcements', { title, description, date });
    return data;
};

// Получение всех объявлений
export const getAllAnnouncements = async () => {
    const { data } = await $host.get('api/announcements');
    return data;
};

// Получение одного объявления по ID
export const getAnnouncementById = async (id) => {
    const { data } = await $host.get(`api/announcements/${id}`);
    return data;
};

// Обновление объявления
export const updateAnnouncement = async (id, title, description, date) => {
    const { data } = await $host.put(`api/announcements/${id}`, { title, description, date });
    return data;
};

// Удаление объявления
export const deleteAnnouncement = async (id) => {
    const { data } = await $host.delete(`api/announcements/${id}`);
    return data;
};
