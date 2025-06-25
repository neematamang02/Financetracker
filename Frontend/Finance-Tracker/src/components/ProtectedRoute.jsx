import Useuser from "@/hooks/use-user";
import ROUTES from "@/routes/routes";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading, error } = Useuser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || error) {
    return <Navigate to={ROUTES.Login_Page} replace />;
  }

  return children;
};

export default ProtectedRoute;
