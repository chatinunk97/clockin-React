import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import {
  getAccessToken,
  getAccessTokenDB,
  removeAccessToken,
  removeAccessTokenDB,
} from "../../utils/local-storage";
import { useNavigate } from "react-router-dom";
export default function SuperAdminMainPage() {
  const navigate = useNavigate();
  const onLogout = () => {
    if (getAccessToken() || getAccessTokenDB()) {
      if (getAccessToken()) {
        removeAccessToken();
        navigate("/login");
      }
      if (getAccessTokenDB()) {
        removeAccessTokenDB();
        navigate("/login");
      }
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <SideNavBar onLogout={onLogout} />
      <div style={{ flex: 1, marginLeft: "200px" }}>
        <Outlet />
      </div>
    </div>
  );
}
