import React, { useState, useEffect } from 'react';
import { getAnnouncementById, updateAnnouncement } from '../http/announcementAPI';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const EditAnnouncement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const announcement = await getAnnouncementById(id);
                setTitle(announcement.title);
                setDescription(announcement.description);
                setUpdatedAt(announcement.updatedAt);
            } catch (error) {
                console.error('Failed to fetch announcement:', error);
            }
        };
        fetchAnnouncement();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Получаем текущее время
        const updatedTime = moment().format('LLLL');

        try {
            await updateAnnouncement(id, title, description, updatedTime);
            alert('Объявление успешно обновлено!');
            navigate('/');
        } catch (error) {
            console.error('Failed to update announcement:', error);
            alert('Не удалось обновить объявление');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Редактировать объявление</h2>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Заголовок:</label>
                <input 
                    type="text" 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Описание:</label>
                <textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 min-h-[100px]"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
                Обновить объявление
            </button>
        </form>
    );
};

export default EditAnnouncement;
