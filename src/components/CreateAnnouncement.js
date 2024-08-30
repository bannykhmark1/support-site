import React, { useState } from 'react';
import { createAnnouncement } from '../http/announcementAPI';
import moment from 'moment-timezone';

const CreateAnnouncement = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Получаем текущее время на клиенте (время будет таким, какое на машине пользователя)
        const localTime = moment().format('LLLL');
        
        try {
            const response = await createAnnouncement(title, description, localTime);
            window.location.reload();
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 whitespace-pre-line"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Описание:</label>
                <textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 min-h-[100px] whitespace-pre-line"
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
