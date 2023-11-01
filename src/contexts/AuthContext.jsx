import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  // const [initialLoading, setInitialLoading] = useState(true)

  const login = (credential) => {
    console.log(credential);
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
