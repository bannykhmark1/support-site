import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import Feedback from "./components/FeedBack";
import LoginYaID from "./components/LoginYaID";
import RedirectToken from "./components/RedirectToken";
import "./App.css";

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('yandexToken');
    if (token) {
      // Проверяем токен
      fetch("https://login.yandex.ru/info?format=json", {
        method: "GET",
        headers: {
          Authorization: `OAuth ${token}`,
        },
      })
        .then(response => response.json())
        .then(userInfo => {
          const allowedDomains = ["kurganmk.ru", "reftp.ru", "hobbs-it.ru"];
          const userEmail = userInfo.default_email || "";

          if (userEmail && userEmail.includes("@")) {
            const userDomain = userEmail.split("@")[1];
            if (allowedDomains.includes(userDomain)) {
              setIsYandexAuth(true);

              fetch("https://support.hobbs-it.ru/api/userYandex/auth/yandex", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }),
              })
              .then(response => response.json())
              .then(() => {
                fetch(`https://support.hobbs-it.ru/api/userYandex/auth/yandex/${userEmail}`)
                  .then(response => response.json())
                  .then(userData => {
                    setUserRole(userData.role);
                  })
                  .catch(error => console.error("Ошибка при получении данных о пользователе:", error));
              })
              .catch(error => console.error("Ошибка при сохранении пользователя:", error));
            } else {
              setIsYandexAuth(false);
              alert("Авторизация с этого домена недопустима.");
            }
          } else {
            alert("Не удалось получить данные пользователя для авторизации.");
          }
        })
        .catch(error => {
          console.error("Ошибка при получении информации о пользователе:", error);
          alert("Не удалось получить данные о пользователе.");
        });
    }
  }, []);

  const handleAuthSuccess = (data) => {
    // Нет необходимости в этом методе, поскольку мы уже обрабатываем авторизацию в useEffect
  };

  const handleLogout = () => {
    localStorage.removeItem('yandexToken'); // Удаляем токен из localStorage
    setIsYandexAuth(false);
    setUserRole(null);
    window.location.reload();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header isYandexAuth={isYandexAuth} handleYandexLogout={handleLogout} />
        {!isYandexAuth ? (
          <>
            <LoginYaID onAuthSuccess={handleAuthSuccess} yaAuth={isYandexAuth} />
            <RedirectToken />
          </>
        ) : (
          <>
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
