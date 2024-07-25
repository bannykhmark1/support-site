import axios from 'axios';

function checkTokenValidity(token) {
  return axios.get('https://login.yandex.ru/info', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => response.data)
  .then(data => true) // Если запрос успешен, токен действителен
  .catch(error => {
    console.error('Ошибка проверки токена', error);
    return false; // Если запрос не успешен, токен недействителен
  });
}

export default checkTokenValidity;
