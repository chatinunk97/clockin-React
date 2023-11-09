import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [initialLoading, setInitialLoading] = useState(true);


  useEffect(() => {
    if (getAccessToken()) {
      clockAxios.get("/user/me").then((res) => {
        setAuthUser(res.data.user);
        setInitialLoading(false);
      });
    }
    
  }, []);

  const login = async (credential) => {
    const res = await clockAxios.post("/user/login", credential);
    addAccessToken(res.data.user.accessToken);
    setAuthUser(res.data.user);
    setInitialLoading(false);
  };

  const logout = () => {
    setInitialLoading(true);
    removeAccessToken();
    setAuthUser(null);
    setInitialLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        initialLoading,
        authUser,
        setAuthUser,
        location,
        setLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
