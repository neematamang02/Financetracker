import { useState, useEffect } from "react";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/categories", {
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
      "/api/categories",
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCategories((prev) => [...prev, res.data]);
  };

  return { categories, loading, error, addCategory };
}
