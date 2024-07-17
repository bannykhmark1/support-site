import React, { useState, useEffect, useContext } from 'react';
import { getAllAnnouncements, deleteAnnouncement } from '../http/announcementAPI';
import Modal from './Modal';
import CreateAnnouncement from './CreateAnnouncement';
import { Context } from "../index";

const ListAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAllAnnouncementsModalOpen, setIsAllAnnouncementsModalOpen] = useState(false);
    const { user } = useContext(Context);

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

    const mostRecentAnnouncement = announcements.length ? announcements[0] : null;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Объявления</h2>
                {user.isAuth && user.user.role === 'ADMIN' && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Создать объявление
                    </button>
                )}
            </div>

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {mostRecentAnnouncement && (
                    <div key={mostRecentAnnouncement.id} className="mb-4 border-b pb-4">
                        <div className="text-gray-500">Команда поддержки УАГ</div>
                        <h3 className="text-xl font-semibold mb-2">{mostRecentAnnouncement.title}</h3>
                        <p className="mb-4">{mostRecentAnnouncement.description}</p>
                        {user.isAuth && user.user.role === 'ADMIN' && (
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleDelete(mostRecentAnnouncement.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Удалить
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {announcements.length > 1 && (
                    <button
                        onClick={() => setIsAllAnnouncementsModalOpen(true)}
                        className="text-blue-500 font-bold hover:underline focus:outline-none"
                    >
                        Показать всё
                    </button>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateAnnouncement onClose={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isAllAnnouncementsModalOpen} onClose={() => setIsAllAnnouncementsModalOpen(false)}>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-screen overflow-y-auto">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="mb-4 border-b pb-4">
                            <div className="text-gray-500">Команда поддержки УАГ</div>
                            <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                            <p className="mb-4">{announcement.description}</p>
                            {user.isAuth && user.user.role === 'ADMIN' && (
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleDelete(announcement.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
