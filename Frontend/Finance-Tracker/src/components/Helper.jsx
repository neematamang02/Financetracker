import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

// Custom hook to fetch and store user profile data
export const useUserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(data.name);
        setEmail(data.email);
        // Prepend base URL so the <img> tag can resolve it
        setProfileImage(
          data.profileImage ? `${API_BASE}${data.profileImage}` : ""
        );
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchProfile();
  }, []);

  return { name, setName, email, setEmail, profileImage, setProfileImage };
};
