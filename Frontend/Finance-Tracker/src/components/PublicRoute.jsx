// src/components/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { parseJwt } from "@/utils/parseJwt";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  const payload = parseJwt(token);
  // If payload.id exists & not expired, redirect to dashboard
  if (payload?.id && payload.exp * 1000 > Date.now()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
