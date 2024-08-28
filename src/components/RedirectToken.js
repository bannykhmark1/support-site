import React, { useEffect } from "react";

const RedirectToken = ({ }) => {
  useEffect(() => {
    YaSendSuggestToken(
      'https://support.hobbs-it.ru/',
      {
         flag: true
      }
   )
  }, []);

  return <div></div>;
};

export default RedirectToken;
