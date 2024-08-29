import React, { useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import Feedback from "./components/FeedBack";
import "./App.css";
import Auth from "./components/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = () => {
    // Логика для авторизации пользователя
    setIsAuthenticated(true);
    setUserRole("user"); // Устанавливаем роль пользователя
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    window.location.reload(); // Перезагружаем страницу после выхода
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Если пользователь не авторизован, показываем компонент Auth */}
        {!isAuthenticated ? (
          <Auth onLogin={handleLogin} />
        ) : (
          <>
            <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <div className="md:flex">
              <ContactForm />
              <ListAnnouncement userRole={userRole} />
            </div>
            <Feedback />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
