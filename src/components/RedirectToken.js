import React, { useEffect } from "react";

const RedirectToken = () => {
  YaSendSuggestToken(
    'https://support.hobbs-it.ru/', 
    {
       flag: true
    }
 )
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('access_token');
    console.log(token)

  }, );

  return <div></div>;
};

export default RedirectToken;
