import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import useAuth from "../hooks/use-auth";

export default function MainLayout() {
  const { logout } = useAuth();
  const page = useLocation().pathname;
  return (
    <div>
      <div className="sticky top-0">
        <Header onClick={logout}>{page}</Header>
      </div>
      <div className="h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
