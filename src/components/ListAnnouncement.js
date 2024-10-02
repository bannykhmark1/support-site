import React, { useState, useEffect } from 'react';
import { getAllAnnouncements, deleteAnnouncement, updateAnnouncement } from '../http/announcementAPI';
import Modal from './Modal';
import CreateAnnouncement from './CreateAnnouncement';
import EditAnnouncement from './EditAnnouncement';
import moment from 'moment-timezone';
import { FaEllipsisV } from 'react-icons/fa';

const ListAnnouncement = ({ userRole }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false); // Состояние для показа всех объявлений
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAnnouncementId, setCurrentAnnouncementId] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

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

    const handleCheckboxChange = async (id, isResolved) => {
        try {
            await updateAnnouncement(id, { isResolved: !isResolved });
            setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.map((announcement) =>
                    announcement.id === id ? { ...announcement, isResolved: !isResolved } : announcement
                )
            );
        } catch (error) {
            console.error('Failed to update announcement:', error);
        }
    };

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
        setActiveMenu(null);
    };

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentAnnouncementId(null);
    };

    const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 3);
    const isAdmin = userRole === 'ADMIN';

    return (
        <div className="md:w-1/2 mx-auto mt-10 p-4">
            <div className="flex justify-between flex-col md:flex-row items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Объявления</h2>
                {isAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-gray-600 border self-start border-gray-300 px-4 py-2 mt-2 rounded-lg hover:bg-gray-100 transition duration-300"
                    >
                        Создать объявление
                    </button>
                )}
            </div>

            <div className="bg-white w-full shadow-lg rounded-lg p-6 mb-6">
                {visibleAnnouncements.map((announcement) => (
                    <div
                        key={announcement.id}
                        className={`mb-6 pb-6 border-b border-gray-200 relative ${announcement.isResolved ? 'border-green-500' : 'border-red-500'}`}
                    >
                        <div className="text-gray-600 mb-2">Команда поддержки УАГ</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {announcement.title}
                            {announcement.updatedAt && announcement.updatedAt !== announcement.createdAt && (
                                <span className="text-gray-500 text-xs ml-2">Изменено</span>
                            )}
                        </h3>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">{announcement.description}</p>
                        <p className="text-gray-400 text-sm">
                            {announcement.date.split('T')[0]}
                            &nbsp;
                            {announcement.date.slice(11, 19)}
                        </p>
                        {isAdmin ? (
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={announcement.isResolved}
                                    onChange={() => handleCheckboxChange(announcement.id, announcement.isResolved)}
                                    className={`form-checkbox ${announcement.isResolved ? 'text-green-500' : 'text-red-500'}`}
                                />
                                <span className={`ml-2 ${announcement.isResolved ? 'text-green-600' : 'text-red-600'}`}>
                                    {announcement.isResolved ? 'Решено' : 'Не решено'}
                                </span>
                            </label>
                        ) : (
                            <span className={`ml-2 ${announcement.isResolved ? 'text-green-600' : 'text-red-600'}`}>
                                {announcement.isResolved ? 'Решено' : 'Не решено'}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateAnnouncement />
            </Modal>

            {isEditModalOpen && (
                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <EditAnnouncement id={currentAnnouncementId} onClose={closeEditModal} />
                </Modal>
            )}
        </div>
    );
};

export default ListAnnouncement;
