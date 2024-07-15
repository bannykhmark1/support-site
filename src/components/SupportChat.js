import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupportChat = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  const fetchMessages = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reply', { userId: selectedUser, message });
      setMessages([...messages, { userId: selectedUser, message, sender: 'support' }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    fetchMessages(userId);
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <div className="w-1/3 border-r">
          <h2 className="font-bold">Users</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index} className="cursor-pointer" onClick={() => handleSelectUser(user)}>
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 pl-4">
          {selectedUser ? (
            <>
              <h2 className="font-bold">Chat with {selectedUser}</h2>
              <div>
                {messages.map((msg, index) => (
                  <div key={index} className={`p-2 mb-2 ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-gray-100'}`}>
                    <strong>{msg.sender}:</strong> {msg.message}
                  </div>
                ))}
              </div>
              <form onSubmit={handleReply} className="mt-4">
                <textarea
                  placeholder="Your reply"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border p-2 mb-2 w-full"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Reply</button>
              </form>
            </>
          ) : (
            <p>Select a user to chat with</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
