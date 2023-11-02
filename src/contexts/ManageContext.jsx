import { useState } from "react";
import { createContext } from "react";
import axios from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import { useEffect } from "react";

export const ManageContext = createContext();

export default function ManageContextProvider({ children }) {
  const [manageUser, setManageUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/user/me")
        .then((res) => {
          setManageUser(res.data.user);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    } else {
      setInitialLoading(false);
    }
  }, []);

  const login = async (credential, loginType) => {
    if (loginType === "dashboard") {
      credential.loginType = "dashboard";
    }
    const res = await axios.post("/user/login", credential);
    addAccessToken(res.data.user.accessToken);
    setManageUser(res.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setManageUser(null);
  };

  return (
    <ManageContext.Provider
      value={{ login, logout, initialLoading, manageUser }}
    >
      {children}
    </ManageContext.Provider>
  );
}
