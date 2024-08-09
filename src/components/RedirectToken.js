import React, { useEffect } from "react";

const RedirectToken = ({ onAuthSuccess }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');

    // Проверьте, что onAuthSuccess передана и вызывается, только если token определен
    if (token && typeof onAuthSuccess === 'function') {
      onAuthSuccess({ access_token: token });
    }
  }, [onAuthSuccess]);

  return <div></div>;  // Технический компонент, UI не нужен
};

export default RedirectToken;
