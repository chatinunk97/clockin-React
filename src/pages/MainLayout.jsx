import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import useAuth from "../hooks/use-auth";

export default function MainLayout() {
  const { logout } = useAuth();
  const page = useLocation().pathname;
  return (
    <div className="flex flex-col">
      <Header onClick={logout}>{page}</Header>
      <div className="overflow-auto h-[73vh]">
        <Outlet/>
      </div>
      <Footer />
    </div>
  );
}
