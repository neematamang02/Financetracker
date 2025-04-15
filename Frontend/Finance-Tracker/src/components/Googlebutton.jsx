import React, { useEffect, useRef } from "react";
import axios from "axios";
const Googlebutton = () => {
  const googlebutton = useRef(null);
  useEffect(() => {
    if (window.google && google.accounts.id) {
      google.accounts.id.initialize({
        client_id:
          "749186845386-purg5mia5h1uh0llgjf22itkjjbmi9tg.apps.googleusercontent.com", // Replace this
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(googlebutton.current, {
        theme: "outline",
        size: "large",
        width: 250,
      });
    }
  }, []);
  const handleCredentialResponse = async (response) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        token: response.credential,
      });
      console.log("Login Success:", res.data);
      // Save JWT and navigate to dashboard, etc.
    } catch (error) {
      console.error("Google Login Failed", error);
    }
  };

  return <div ref={googlebutton}></div>;
};

export default Googlebutton;
