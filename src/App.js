import React, { useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import Feedback from "./components/FeedBack";
import "./App.css";
import Auth from "./components/Auth";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Для хранения роли пользователя

  const handleLogin = () => {
    // Логика для авторизации пользователя
    setIsAuthenticated(true);
    // Установка роли пользователя после успешной авторизации
    setUserRole("user"); // Например, "admin" или "user"
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null); // Сброс роли пользователя
    window.location.reload(); // Перезагружаем страницу после выхода
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Auth />
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        {!isAuthenticated ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <>
            <div className="md:flex">
              <ContactForm />
              <ListAnnouncement userRole={userRole} /> {/* Передаем роль пользователя */}
            </div>
            <Feedback />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
