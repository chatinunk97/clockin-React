import { ToastContainer } from "react-toastify";
import "./App.css";
import Route from "./routes/Route";
import useAuth from "./hooks/use-auth";
import Loading from "./components/Loading";

function App() {
  const { isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <Route />
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
