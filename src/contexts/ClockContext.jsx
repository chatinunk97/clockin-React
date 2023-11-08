import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../hooks/use-auth";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import getDistance from "../utils/getDistance";

export const ClockContext = createContext();
export default function ClockContextProvider({ children }) {
  //Location from AuthContext
  const { location } = useAuth();
  const [isClockIn, setIsClockIn] = useState(true);
  const [companyLocation, setCompanyLocation] = useState({ lat: "", lng: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(null);
  const fetchLocationTime = async () => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=1331161200&key=AIzaSyALKm5K2JFpte9A8cXryHMa2cJR3j7jemo`
    );
    const time = await axios.get(
      `http://worldtimeapi.org/api/timezone/${res.data.timeZoneId}`
    );
    //Compnay Location
    const { data } = await clockAxios.get(`/clock/location`);
    setCompanyLocation({
      lat: data.latitudeCompany,
      lng: data.longitudeCompany,
    });
    setTime(new Date(time.data.datetime));
    //Latest Clock
    const latestClock = await clockAxios.get("/clock/latestClock");
    if (!latestClock.data) {
      setIsClockIn(true);
    } else {
      setIsClockIn(false);
    }
    setIsLoading(false);
  };
  const clockIn = async (companyLocation, userLocation, time) => {
    try {
      console.log("Clock In");
      if (getDistance(companyLocation, location) > 50) {
        return alert("You're out of clock in/out range ; 50 meters");
      }
      await clockAxios.post(
        "clock/clockIn",
        clockObject(userLocation, time, "clockIn")
      );
      setIsClockIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  const clockOut = async (companyLocation, userLocation, time) => {
    try {
      console.log("Clock Out");
      if (getDistance(companyLocation, location) > 50) {
        return alert("You're out of clock in/out range ; 50 meters");
      }
      await clockAxios.patch(
        "clock/clockOut",
        clockObject(userLocation, time, "clockOut")
      );
      console.log(result);
      setIsClockIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLocationTime();
  }, []);

  const shareObj = {
    isClockIn,
    companyLocation,
    isLoading,
    time,
    setTime,
    setIsClockIn,
    clockIn,
    clockOut,
  };
  return (
    <ClockContext.Provider value={shareObj}>{children}</ClockContext.Provider>
  );
}
