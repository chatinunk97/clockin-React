import { useState } from "react";
import { createContext } from "react";
import axios from "../config/axios";
import {
  addAccessTokenDB,
  getAccessTokenDB,
  removeAccessTokenDB,
} from "../utils/local-storage";
import { useEffect } from "react";

export const ManageContext = createContext();

export default function ManageContextProvider({ children }) {
  const [manageUser, setManageUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (getAccessTokenDB()) {
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

  const login = async (credential) => {
    credential.loginType = "dashboard";
    const res = await axios.post("/user/login", credential);
    console.log(res);
    addAccessTokenDB(res.data.user.accessToken_db);
    setManageUser(res.data.user);
  };

  const logout = () => {
    removeAccessTokenDB();
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
