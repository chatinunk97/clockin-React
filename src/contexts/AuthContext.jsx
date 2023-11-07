import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import locationPermission from "../utils/locationPermission";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [initialLoading, setInitialLoading] = useState(true);
  const [time, setTime] = useState("time");

  useEffect(() => {
    if (getAccessToken()) {
      clockAxios.get("/user/me").then((res) => {
        setAuthUser(res.data.user);
      });
    }
    //Get location permission
    locationPermission()
      .then((location) => {
        setLocation(location);
      })
      .catch((error) => {
       alert('User dinied location permission, refreshing page')
       setTimeout(() => {
        console.log('bye')
        window.location.href = "http://localhost:5173/login";
       }, 1000);
       

      })
      .finally(()=>{
        setInitialLoading(false)
      });
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
    console.log("logout");
  };
  const clockIn = async (input) => {
    try {
      console.log("Clock In");
    } catch (error) {
      console.log(error);
    }
  };
  const clockOut = async (input) => {
    try {
      console.log("Clock Out");
    } catch (error) {
      console.log(error);
    }
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
        time,
        setTime,
        clockIn,
        clockOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
