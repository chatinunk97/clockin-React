import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import getDistance from "../utils/getDistance";
import locationPermission from "../utils/locationPermission";
import clockObjectChange from "../utils/clockObjectChange";

export const ClockContext = createContext();
export default function ClockContextProvider({ children }) {
  //Location from AuthContext

  const [isClockIn, setIsClockIn] = useState(true);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [companyLocation, setCompanyLocation] = useState({ lat: "", lng: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(null);
  const fetchLocationTime = async () => {
    //Get user location
    const location = await locationPermission()
    setLocation(location)

    //Get user timezone based on location
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=1331161200&key=AIzaSyALKm5K2JFpte9A8cXryHMa2cJR3j7jemo`
    );
    //Get user time based on timezone
    const time = await axios.get(
      `http://worldtimeapi.org/api/timezone/${res.data.timeZoneId}`
    );
    //Get Compnay Location
    const { data } = await clockAxios.get(`/clock/location`);
    setCompanyLocation({
      lat: data.latitudeCompany,
      lng: data.longitudeCompany,
    });
    setTime(new Date(time.data.datetime));
    //Newest Clock
    const newestClock = await clockAxios.get("/clock/latestClock");
    if (!newestClock.data) {
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
        clockObjectChange(userLocation, time, "clockIn")
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
        clockObjectChange(userLocation, time, "clockOut")
      );
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
    location
  };
  return (
    <ClockContext.Provider value={shareObj}>{children}</ClockContext.Provider>
  );
}
