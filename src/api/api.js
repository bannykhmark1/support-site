import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerAdmin = async (username, password) => {
  return await axios.post(`${API_URL}/register`, { username, password });
};

export const loginAdmin = async (username, password) => {
  return await axios.post(`${API_URL}/login`, { username, password });
};

export const createAnnouncement = async (token, title, content) => {
  return await axios.post(
    `${API_URL}/announcement`,
    { title, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// Дополнительные функции для обновления и получения объявлений можно добавить
