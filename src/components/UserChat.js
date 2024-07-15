import React, { useState } from 'react';
import axios from 'axios';

const UserChat = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/message', { userId, message });
      setMessages([...messages, { userId, message, sender: 'user' }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Your ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Send</button>
      </form>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 mb-2 ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-gray-100'}`}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChat;
