import React, { useState, useEffect } from 'react';
import { getAllAnnouncements, deleteAnnouncement } from '../http/announcementAPI';
import Modal from './Modal';
import CreateAnnouncement from './CreateAnnouncement';
import EditAnnouncement from './EditAnnouncement';
import moment from 'moment-timezone';

const ListAnnouncement = ({ userRole }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAnnouncementId, setCurrentAnnouncementId] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const data = await getAllAnnouncements();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAnnouncements(sortedData);
            } catch (error) {
                console.error('Failed to fetch announcements:', error);
            }
        };
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

    const handleEdit = (id) => {
        setCurrentAnnouncementId(id);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentAnnouncementId(null);
    };

    const visibleAnnouncements = announcements.slice(0, 3);
    const isAdmin = userRole === 'ADMIN';

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
                        <p className="text-gray-700 text-sm font-bold">
                            {announcement.date.split('T')[0]}
                            &nbsp;  
                            {announcement.date.slice('11', '19')}
                        </p>
                        {announcement.updatedAt && announcement.updatedAt !== announcement.createdAt && (
                            <p className="text-gray-500 text-sm mt-2">Изменено: {moment(announcement.updatedAt).format('LLL')}</p>
                        )}
                        {isAdmin && (
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => handleEdit(announcement.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300"
                                >
                                    Редактировать
                                </button>
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateAnnouncement onClose={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <EditAnnouncement id={currentAnnouncementId} onClose={closeEditModal} />
            </Modal>
        </div>
    );
};

export default ListAnnouncement;
