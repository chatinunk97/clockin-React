import { useState } from "react";
import { createContext } from "react";
import axios from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import { useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/user/me")
        .then((res) => {
          setAuthUser(res.data.user);
        })
        .finally(() => {
          setInitialLoading(false);
        });
    } else {
      setInitialLoading(false);
    }
  }, []);

  const login = async (credential) => {
    const res = await axios.post("/user/login", credential);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
    console.log(credential);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
    console.log("logout");
  };

  return (
    <AuthContext.Provider value={{ login, logout, initialLoading, authUser }}>
      {children}
    </AuthContext.Provider>
  );
}
