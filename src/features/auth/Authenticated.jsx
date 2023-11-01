import useAuth from "../../hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children }) {
  const { authUser } = useAuth();
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
