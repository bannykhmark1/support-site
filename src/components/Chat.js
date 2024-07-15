import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      await axios.post('http://localhost:5000/api/message', { message: input });
      setMessages([...messages, newMessage, { text: 'Сообщение отправлено в поддержку', sender: 'system' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, newMessage, { text: 'Ошибка отправки сообщения', sender: 'system' }]);
    }

    setInput('');
  };

  return (
    <div className="chat-container bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="messages mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'text-right' : 'text-left'} mb-2`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="input-group flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg"
          onClick={sendMessage}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Chat;
