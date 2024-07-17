import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const UserChat = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Load messages from server and localStorage on mount
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) return;

      const storedMessages = localStorage.getItem('messages');
      if (storedMessages) {
        const { data, timestamp } = JSON.parse(storedMessages);
        const currentTime = new Date().getTime();

        // Check if data is older than 24 hours
        if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
          setMessages(data);
        } else {
          localStorage.removeItem('messages');
        }
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/messages/${userId}`);
        setMessages(response.data);
        localStorage.setItem('messages', JSON.stringify({ data: response.data, timestamp: new Date().getTime() }));
      } catch (error) {
        console.error('Error retrieving messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  // Save messages to localStorage whenever they update
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify({ data: messages, timestamp: new Date().getTime() }));
  }, [messages]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data) => {
      console.log('New message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/message', { userId, message });
      setMessages((prevMessages) => [...prevMessages, { userId, message, sender: 'user' }]);
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
