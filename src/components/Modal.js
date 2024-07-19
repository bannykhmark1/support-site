import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={handleClickOutside}>
            <div className="rounded-lg w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-10 m-4 text-gray-600 hover:text-gray-900"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
