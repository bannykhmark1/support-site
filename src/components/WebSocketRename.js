// src/components/WebSocketClient.js

import React, { useEffect, useState } from 'react';

const WebSocketClient = () => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Создаем WebSocket соединение
        const ws = new WebSocket('wss://support.hobbs-it.ru/ws');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            ws.send('Hello Server!');
        };

        ws.onmessage = (event) => {
            console.log('Message from server: ', event.data);
            setMessage(event.data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        // Сохраняем WebSocket в состоянии
        setSocket(ws);

        // Очистка WebSocket соединения при размонтировании компонента
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (msg) => {
        if (socket) {
            socket.send(msg);
        }
    };

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Message from server: {message}</p>
            <button onClick={() => sendMessage('Another message')}>Send Message</button>
        </div>
    );
};

export default WebSocketClient;
