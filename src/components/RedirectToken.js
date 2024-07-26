import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RedirectToken({ onAuthSuccess }) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        localStorage.setItem('yandexToken', token);
        localStorage.setItem('isYandexAuth', 'true');
        window.opener.postMessage({ token }, window.location.origin);
        window.close();
      }
    }
  }, [location, onAuthSuccess]);

  return null;
}

export default RedirectToken;
