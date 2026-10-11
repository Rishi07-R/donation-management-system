import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

export default function ProtectedRoute() {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="center">Checking access...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <Navigate
        to="/admin-login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}