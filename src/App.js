import React, { useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import Feedback from "./components/FeedBack";
import LoginYaID from "./components/LoginYaID";
import RedirectToken from "./components/RedirectToken";
import "./App.css";

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);
  const [userRole, setUserRole] = useState(null); // Для хранения роли пользователя

  const handleAuthSuccess = (data) => {
    const token = data.access_token;
    if (token) {
      fetch("https://login.yandex.ru/info?format=json", {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userInfo) => {
          const allowedDomains = ["kurganmk.ru", "reftp.ru", "hobbs-it.ru"];
          const userEmail = userInfo.default_email || "";

          if (userEmail && userEmail.includes("@")) {
            const userDomain = userEmail.split("@")[1];
            if (allowedDomains.includes(userDomain)) {
              // Сохраняем пользователя в базе данных
              fetch("https://support.hobbs-it.ru/api/userYandex/auth/yandex", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
              })
              .then((response) => response.json())
              .then((data) => {
                console.log("Пользователь сохранен в БД:", data);
                setIsYandexAuth(true);

                // Получаем роль пользователя
                fetch(`https://support.hobbs-it.ru/api/userYandex/auth/yandex/${userEmail}`)
                  .then((response) => response.json())
                  .then((userData) => {
                    setUserRole(userData.role);
                  })
                  .catch((error) => {
                    console.error("Ошибка при получении данных о пользователе:", error);
                  });
              })
              .catch((error) => {
                console.error("Ошибка при сохранении пользователя:", error);
              });
            } else {
              setIsYandexAuth(false);
              alert("Авторизация с этого домена недопустима.");
            }
          } else {
            alert("Не удалось получить данные пользователя для авторизации.");
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении информации о пользователе:", error);
          alert("Не удалось получить данные о пользователе.");
        });
    } else {
      alert("Не удалось получить токен доступа.");
    }
  };

  const handleLogout = () => {
    setIsYandexAuth(false);
    setUserRole(null); // Сброс роли пользователя
    window.location.reload(); // Перезагружаем страницу после выхода
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header isYandexAuth={isYandexAuth} handleYandexLogout={handleLogout} />
        {!isYandexAuth ? (
          <>
            <LoginYaID onAuthSuccess={handleAuthSuccess} yaAuth={isYandexAuth} />
            <RedirectToken onAuthSuccess={handleAuthSuccess} />
          </>
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
