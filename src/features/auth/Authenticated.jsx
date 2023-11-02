import useAuth from "../../hooks/use-auth";
import useManage from "../../hooks/use-manage";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children, pageType }) {
  const { authUser } = useAuth();
  const { manageUser } = useManage();
  if (pageType === "clock") {
    if (!authUser) {
      return <Navigate to="/login" />;
    }
  }
  if (pageType === "dashboard") {
    if (!manageUser) {
      return <Navigate to="/manage/login"/>
    }
  }
  return children;
}
