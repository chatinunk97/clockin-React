import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";
import getDistance from "../utils/getDistance";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isClockin, setIsClockIn] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [companyLocation, setCompanyLocation] = useState({ lat: "", lng: "" });
  const [initialLoading, setInitialLoading] = useState(true);
  const [time, setTime] = useState("time");

  useEffect(() => {
    if (getAccessToken()) {
      clockAxios
        .get("/user/me")
        .then((res) => {
          if (!res.data.newestClock || res.data.newestClock.clockOutTime) {
            setAuthUser({ ...res.data.user });
            console.log("first######");
            setIsClockIn(true);
          } else {
            setAuthUser({ ...res.data.user, clockId: res.data.newestClock.id });
            setIsClockIn(false);
          }
        })
        .then(() => {
          //Get first company location
          clockAxios.get("/clock/location").then((res) => {
            setCompanyLocation({
              lat: res.data[0].latitudeCompany,
              lng: res.data[0].longitudeCompany,
            });
          });
        });
    }
    //Get location permission
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
      console.log(location, companyLocation);
      if (getDistance(location, companyLocation) > 100) {
        return alert(`You are out of clock in range !`);
      }
      const result = await clockAxios.post("/clock/clockin", input);
      const clockInTime = new Date(result.data.clockIn.clockInTime);
      if (result.data.clockIn.status === "LATE") {
        alert("You're freaking late !!! ");
      }
      alert(`Clock in Successfully ! at ${clockInTime}`);
      setIsClockIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  const clockOut = async (input) => {
    try {
      const result = await clockAxios.patch("/clock/clockout", input);
      const clockOutTime = new Date(result.data.clock.clockOutTime);
      alert(`Clock out Successfully! at ${clockOutTime}`);
      setIsClockIn(true);
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
        isClockin,
        companyLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
