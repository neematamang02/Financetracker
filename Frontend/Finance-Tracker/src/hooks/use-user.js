import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

const Useuser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("API_BASE in Useuser:", API_BASE);
        const token = localStorage.getItem("token");
        console.log("Token retrieved from localStorage:", token);
        if (!token) {
          throw new Error("No token found");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_BASE}/api/auth/me`, config);
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error(
          "Error fetching user:",
          err.response?.data || err.message
        );
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default Useuser;
