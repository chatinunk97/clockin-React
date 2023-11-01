import { useState } from "react";
import { createContext } from "react";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  // const [initialLoading, setInitialLoading] = useState(true)

  const login = (credential) => {
    // const res = await axios.post("/auth/login", credential);
    // addAccessToken(res.data.accessToken); //ได้ access token ได้มาจาก res
    // setAuthUser(res.data.user);
    console.log(credential);
  };

  const logout = () => {
    // removeAccessToken();
    // setAuthUser(null);
    console.log("logout");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
