function App() {
  const [isYandexAuth, setIsYandexAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('yandexToken');
    if (token) {
      checkTokenValidity(token)
        .then(isValid => setIsYandexAuth(isValid))
        .catch(() => setIsYandexAuth(false));
    }
  }, []);

  const handleAuthSuccess = (data) => {
    const token = data.token; // Используем токен из данных, переданных в handleAuthSuccess

    fetch('https://login.yandex.ru/info?format=json', {
      method: 'GET',
      headers: {
        'Authorization': `OAuth ${token}`,
      },
    })
    .then(response => response.json())
    .then(userInfo => {
      const allowedDomains = ['kurganmk.ru', 'reftp.ru', 'hobbs-it.ru'];
      const userEmail = userInfo.default_email || '';

      console.log('Полученный email:', userEmail);

      if (typeof userEmail === 'string' && userEmail.includes('@')) {
        const userDomain = userEmail.split('@')[1]; // Извлечение домена из email
        if (allowedDomains.includes(userDomain)) {
          localStorage.setItem('yandexToken', token); // Сохраняем токен
          setIsYandexAuth(true);
        } else {
          console.log('Недопустимый домен:', userDomain);
          alert('Авторизация с этого домена недопустима.');
        }
      } else {
        console.log('Email пользователя не предоставлен или невалиден:', userEmail);
        alert('Не удалось получить данные пользователя для авторизации.');
      }
    })
    .catch(error => {
      console.error('Ошибка при получении информации о пользователе:', error);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Header />
        {isYandexAuth ? (
          <>
            <MessengerWidget />
            <ListAnnouncement />
            <ContactForm />
          </>
        ) : (
          <>
            <LoginYaID onAuthSuccess={handleAuthSuccess} />
            <RedirectToken onAuthSuccess={handleAuthSuccess} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
