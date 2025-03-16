import React, { useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";

const App = () => {
  useEffect(() => {
    axiosInstance
      .get("/auth/login")
      .then((response) => console.log(response.data))
      .catch((error) => console.error("API Error:", error));
  }, []);

  return <div className="text-blue-50">This is my Finance Tracker Project</div>;
};

export default App;
