import React, { useState, useEffect } from 'react';
import { getAllAnnouncements, deleteAnnouncement } from '../http/announcementAPI';
import Modal from './Modal';
import CreateAnnouncement from './CreateAnnouncement';
import moment from 'moment-timezone';

const ListAnnouncement = ({ userRole }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAllAnnouncementsModalOpen, setIsAllAnnouncementsModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false); // Состояние для показа всех объявлений

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAllAnnouncements();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAnnouncements(sortedData);
            } catch (error) {
                console.error('Failed to fetch announcements:', error);
            }
        }
        fetchAnnouncements();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteAnnouncement(id);
            setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
        } catch (error) {
            console.error('Failed to delete announcement:', error);
        }
    };

    const formatDate = (dateString) => {
        return moment.tz(dateString, 'Asia/Yekaterinburg').format('YYYY-MM-DD HH:mm:ss');
    };

    // Определяем, какие объявления показывать
    const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 3);

    // Проверяем, является ли пользователь администратором
    const isAdmin = userRole === 'ADMIN';

    console.log(isAdmin)

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Объявления</h2>
                {isAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300"
                    >
                        Создать объявление
                    </button>
                )}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                {visibleAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="mb-6 pb-6 border-b border-gray-200">
                        <div className="text-gray-600 mb-2">Команда поддержки УАГ</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{announcement.title}</h3>
                        <p className="text-gray-700 mb-4">{announcement.description}</p>
                        <p className="text-gray-700 text-sm font-bold">{(announcement.date)}</p>
                        {isAdmin && (
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleDelete(announcement.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
                                >
                                    Удалить
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {!showAll && announcements.length > 3 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="text-indigo-600 font-bold hover:underline focus:outline-none"
                    >
                        Показать всё
                    </button>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateAnnouncement onClose={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isAllAnnouncementsModalOpen} onClose={() => setIsAllAnnouncementsModalOpen(false)}>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-4 max-h-screen overflow-y-auto">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="mb-6 pb-6 border-b border-gray-200">
                            <div className="text-gray-600 mb-2">Команда поддержки УАГ</div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{announcement.title}</h3>
                            <p className="text-gray-700 mb-4">{announcement.description}</p>
                            <p className="text-gray-700 mb-4">{formatDate(announcement.date)}</p>
                            {isAdmin && (
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(announcement.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default ListAnnouncement;
