import React, { useEffect } from "react";

const RedirectToken = ({ onAuthSuccess }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');
    if (token && typeof onAuthSuccess === 'function') {
      onAuthSuccess({ access_token: token });
    } else {
      console.error("onAuthSuccess is not a function or token is missing.");
    }
  }, [onAuthSuccess]);

  return <div></div>;
};

export default RedirectToken;
