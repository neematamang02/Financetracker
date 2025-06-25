import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

// Custom hook to fetch and store user profile data
export const useUserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const { data } = await axios.get(`${API_BASE}/api/auth/me`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setName(data.name);
  //       setEmail(data.email);
  //       // Prepend base URL so the <img> tag can resolve it
  //       setProfileImage(
  //         data.profileImage ? `${API_BASE}${data.profileImage}` : ""
  //       );
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //     }
  //   };
  //   fetchProfile();
  // }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("API_BASE in useUserProfile:", API_BASE);
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          throw new Error("No token found");
        }
        const { data } = await axios.get(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched user data:", data);
        setName(data.name);
        setEmail(data.email);
        setProfileImage(
          data.profileImage ? `${API_BASE}${data.profileImage}` : ""
        );
      } catch (err) {
        console.error(
          "Error fetching user data:",
          err.response?.data || err.message
        );
      }
    };
    fetchProfile();
  }, []);
  return { name, setName, email, setEmail, profileImage, setProfileImage };
};
