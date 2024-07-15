

import React from 'react';
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import Chat from './components/Chat';
import './App.css';
import SupportChat from './components/SupportChat';
import UserChat from './components/UserChat';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header />
        <InfoSection />
        <ContactForm />
        <ContactInfo />
        <Chat />
        <SupportChat />
        <UserChat />
      </div>
    </div>
  );
}

export default App;
