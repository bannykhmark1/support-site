import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const FeedbackForm = ({ isOpen, onClose }) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const YANDEX_TRACKER_URL = process.env.REACT_APP_YANDEX_TRACKER_URL;
    const YANDEX_TRACKER_OAUTH_TOKEN = process.env.REACT_APP_YANDEX_TRACKER_OAUTH_TOKEN;
    const YANDEX_TRACKER_ORG_ID = process.env.REACT_APP_YANDEX_TRACKER_ORG_ID;
    const YANDEX_TRACKER_QUEUE = process.env.REACT_APP_YANDEX_TRACKER_QUEUE;
    
    try {
      const response = await axios.post(
        YANDEX_TRACKER_URL,
        {
          summary,
          description,
          queue: YANDEX_TRACKER_QUEUE
        },
        {
          headers: {
            'Authorization': `OAuth ${YANDEX_TRACKER_OAUTH_TOKEN}`,
            'X-Org-ID': YANDEX_TRACKER_ORG_ID,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response:', response);
      setStatus(`Задача создана успешно: ${response.data.key}`);
    } catch (error) {
      console.error('Ошибка создания задачи:', error);
      setStatus('Ошибка создания задачи');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-semibold mb-4">Форма обратной связи</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Тема идеи:</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Описание идеи:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Отправить</button>
      </form>
      {status && <p className="mt-4 text-red-500">{status}</p>}
    </Modal>
  );
};

export default FeedbackForm;
