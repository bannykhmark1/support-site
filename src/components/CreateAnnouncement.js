import React, { useState } from 'react';
import { createAnnouncement } from '../http/announcementAPI';

const CreateAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Получаем текущую дату и время с учетом часового пояса Екатеринбурга (UTC+5)
        const now = new Date();
        const ekbOffset = 60 * 60 * 1000; // UTC+5 в миллисекундах
        const ekbTime = new Date(now.getTime() + ekbOffset - now.getTimezoneOffset() * 60 * 1000);
        const formattedDate = ekbTime.toISOString().slice(0, 19).replace('Z', ' ');

        try {
            const response = await createAnnouncement(title, description, formattedDate);
    
            // Очистка полей после успешного создания объявления
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating announcement:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Создать объявление</h2>
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
                Создать объявление
            </button>
        </form>
    );
};

export default CreateAnnouncement;
