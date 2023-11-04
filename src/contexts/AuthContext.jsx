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
  const [time, setTime] = useState("time");

  useEffect(() => {
    if (getAccessToken()) {
      clockAxios.get("/user/me").then((res) => {
        setAuthUser(res.data.user);
      });
    }

    if (navigator.geolocation) {
      setInitialLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // User allowed access to their location
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ lat: +latitude, lng: +longitude });
          console.log(
            `User's location: Latitude ${latitude}, Longitude ${longitude}`
          );
          setInitialLoading(false);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            // User denied access to their location
            console.error("User denied access to their location.");
          } else {
            // Handle other geolocation-related errors
            console.error("Error getting geolocation: " + error.message);
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
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
    console.log("logout");
  };

  const clockIn = async (input) => {
    try {
      const result = await clockAxios.post("/clock/clockin", input);
    } catch (error) {
      console.log(error);
    }
  };

  const leaveRequest = async (leaveData) => {
    try {
      const res = await clockAxios.post("/leave/createRequestLeave", leaveData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        initialLoading,
        authUser,
        location,
        setLocation,
        time,
        setTime,
        clockIn,
        leaveRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
