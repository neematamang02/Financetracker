import { useState, useEffect } from "react";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // add new category
  const addCategory = async (name) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_BASE}/api/categories`,
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCategories((prev) => [...prev, res.data]);
  };

  return { categories, loading, error, addCategory };
}
