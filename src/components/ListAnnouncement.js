import React, { useState, useEffect } from 'react';
import { getAllAnnouncements, deleteAnnouncement, updateAnnouncement } from '../http/announcementAPI';
import Modal from './Modal';
import CreateAnnouncement from './CreateAnnouncement';
import EditAnnouncement from './EditAnnouncement';
import { FaEllipsisV, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ListAnnouncement = ({ userRole }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
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

    const handleDelete = async (id) => {
        try {
            await deleteAnnouncement(id);
            setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
            setActiveMenu(null);
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

    const handleCheckboxChange = async (announcement) => {
        try {
            const updatedAnnouncement = await updateAnnouncement(announcement.id, {
                ...announcement,
                isResolved: !announcement.isResolved,
            });
            setAnnouncements((prev) =>
                prev.map((a) => (a.id === updatedAnnouncement.id ? updatedAnnouncement : a))
            );
        } catch (error) {
            console.error('Failed to update announcement:', error);
        }
    };

    const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 3);
    const isAdmin = userRole === 'ADMIN';

    return (
        <div className="md:w-1/2 flex flex-col mt-10">
            <div className="flex justify-between gap-4 md:flex items-start mb-6">
                <h2 className="md:text-3xl text-2xl font-bold text-[#02483A]">Объявления</h2>
                {isAdmin && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center bg-[#dffd8d] text-[#02483A] font-bold py-2 md:px-4 px-2 rounded-md shadow-md hover:bg-[#d0dec7] transition duration-300"
                    >
                        Создать объявление
                    </motion.button>
                )}
            </div>

            <div className="bg-white w-full shadow-lg rounded-lg p-6 mb-6">
                {visibleAnnouncements.map((announcement) => (
                    <motion.div
                        key={announcement.id}
                        className={`mb-6 pb-6 border-b ${announcement.isResolved ? 'border-green-500' : 'border-gray-200'} relative`}
                        
                    >
                        <div className="text-[#02483A] mb-2">Команда поддержки УАГ</div>
                        <h3 className="text-xl font-semibold text-[#02483A] mb-4">
                            {announcement.title}
                            {announcement.updatedAt && announcement.updatedAt !== announcement.createdAt && (
                                <span className="text-gray-500 text-xs ml-2">Изменено</span>
                            )}
                        </h3>
                        <p className="text-[#02483A] mb-4 whitespace-pre-line">{announcement.description}</p>
                        <p className="text-gray-400 text-sm">
                            {announcement.date.split('T')[0]} &nbsp; {announcement.date.slice(11, 19)}
                        </p>
                        {isAdmin && (
                            <>
                                <div className="absolute top-0 right-0">
                                    <button onClick={() => toggleMenu(announcement.id)}>
                                        <FaEllipsisV className="text-[#02483A] hover:text-[#dffd8d]" />
                                    </button>
                                    {activeMenu === announcement.id && (
                                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                                            <button
                                                onClick={() => handleEdit(announcement.id)}
                                                className="block w-full text-left px-4 py-2 text-[#02483A] hover:bg-[#dffd8d]"
                                            >
                                                Редактировать
                                            </button>
                                            <button
                                                onClick={() => handleDelete(announcement.id)}
                                                className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <label className="flex items-center mt-4 space-x-2 cursor-pointer">
                                    <div
                                        onClick={() => handleCheckboxChange(announcement)}
                                        className="relative w-6 h-6 flex items-center justify-center"
                                    >
                                        {announcement.isResolved ? (
                                            <FaCheckCircle className="w-6 h-6 text-green-500" />
                                        ) : (
                                            <FaRegCircle className="w-6 h-6 text-[#02483A]" />
                                        )}
                                    </div>
                                    <span className="text-[#02483A]">Работы завершены</span>
                                </label>
                            </>
                        )}
                    </motion.div>
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