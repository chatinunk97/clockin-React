import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";

export default function RedirectIfAuthenticated({ children, pageType }) {
  const { authUser } = useAuth();
  const { manageUser } = useManage();
  if (pageType === "clock") {
    if (authUser) {
      return <Navigate to="/clockin" />;
    }
  }
  if (pageType === "dashboard") {
    if (manageUser) {
      return   <Navigate to="/manage" />;
    }
  }
  return children;
}
