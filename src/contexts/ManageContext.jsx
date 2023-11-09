import { useState } from "react";
import { createContext } from "react";
import { dashboardAxios } from "../config/axios";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getAccessTokenDB()) {
      dashboardAxios
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
    const res = await dashboardAxios.post("/user/login", credential);
    addAccessTokenDB(res.data.user.accessToken_db);
    setManageUser(res.data.user);
  };

  const logout = () => {
    removeAccessTokenDB();
    setManageUser(null);
    setInitialLoading(false);
  };

  return (
    <ManageContext.Provider
      value={{
        login,
        logout,
        initialLoading,
        manageUser,
        setInitialLoading,
        loading,
      }}
    >
      {children}
    </ManageContext.Provider>
  );
}
