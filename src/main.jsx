import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import ManageContextProvider from "./contexts/ManageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ManageContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ManageContextProvider>
);
