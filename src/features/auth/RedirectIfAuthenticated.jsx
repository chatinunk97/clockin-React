import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

export default function RedirectIfAuthenticated({ children }) {
  const { authUser } = useAuth();
  if (authUser) {
    return <Navigate to="/clockin" />;
  }
  return children;
}
