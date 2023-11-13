import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import ManageContextProvider from "./contexts/ManageContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ManageContextProvider>
      <App />
    </ManageContextProvider>
  </AuthContextProvider>
);
