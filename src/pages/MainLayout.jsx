import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
  const page = useLocation().pathname;
  return (
    <div>
      <Header>{page}</Header>
      <Outlet />
      <Footer>Footer Menu</Footer>
    </div>
  );
}
