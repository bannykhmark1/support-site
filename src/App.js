import React, { useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ListAnnouncement from "./components/ListAnnouncement";
import MessengerWidget from "./components/MessengerWidget";
import LoginYaID from "./components/LoginYaID";
import RedirectToken from "./components/RedirectToken";
import FeedbackForm from "./components/FeedbackForm";
import Feedback from "./components/FeedBack";
import "./App.css";

function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  const handleAuthSuccess = (data) => {
    console.log(data)
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
              setIsYandexAuth(true);
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
    window.location.reload(); // Перезагружаем страницу после выхода
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header isYandexAuth={isYandexAuth} handleYandexLogout={handleLogout} />
        {isYandexAuth ? (
          <>
            <div className="md:flex">
              <ContactForm />
              <ListAnnouncement />
            </div>
            <Feedback />
          </>
        ) : (
          <>
            <LoginYaID onAuthSuccess={handleAuthSuccess} yaAuth={isYandexAuth} />
            <RedirectToken onAuthSuccess={handleAuthSuccess} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
