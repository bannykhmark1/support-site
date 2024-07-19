    import React, { useEffect } from 'react';
    import { createSingleChatWidget } from 'yandex-messenger-widget';

    const MessengerWidget = () => {
    useEffect(() => {
        console.log('Initializing Yandex Messenger Widget...');
        createSingleChatWidget({
        button: {
            label: 'Напишите нам',
            color: '#FFA000',
        },
        companyId: 'b1g6pds6qm1ma8bctgt5',
        // другие настройки виджета
        });
        console.log('Yandex Messenger Widget initialized successfully');
    }, []);

    return null; // Компонент не отображает ничего, так как виджет сам добавляет необходимые элементы
    };

    export default MessengerWidget;
