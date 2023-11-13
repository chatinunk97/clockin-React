import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import useAuth from "../hooks/use-auth";
import { Navigate } from "react-router-dom";

export default function MainLayout() {
  const { logout } = useAuth();
  const page = useLocation().pathname;
  console.log(page);
  console.log(page);
  return (
    <div className="flex flex-col h-screen min-h-[667px] min-w-[375px] max-w-[1024px] m-auto">
      <Header onClick={logout}></Header>
    <div className="flex flex-col max-w-4xl m-auto  h-screen min-h-[667px] min-w-[375px]">
      <Header onClick={logout}>{page}</Header>
      <div className="overflow-auto h-full">
        {page === "/" ? <Navigate to={"/clockin"} /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
}
