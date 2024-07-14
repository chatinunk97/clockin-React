import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { clockAxios } from "../config/axios";
import getDistance from "../utils/getDistance";
import locationPermission from "../utils/locationPermission";
import clockObjectChange from "../utils/clockObjectChange";
import todayString from "../utils/getTodayString";
import Swal from "sweetalert2";

export const ClockContext = createContext();
export default function ClockContextProvider({ children }) {
  //Location from AuthContext

  const [isClockIn, setIsClockIn] = useState(true);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [isCheckLocation, setIsCheckLocation] = useState(true);
  const [companyLocation, setCompanyLocation] = useState({ lat: "", lng: "" });
  const [reasonLocation, setReasonLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(null);
  const [clockHistory, setClockHistory] = useState([]);
  const fetchLocationTime = async () => {
    //Get user location
    const location = await locationPermission();
    setLocation(location);
    
    //Get user timezone based on location
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=1331161200&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );
    //Get user time based on timezone
    const time = await axios.get(
      `https://worldtimeapi.org/api/timezone/${res.data.timeZoneId}`
    );
    //Get Company Location
    const { data } = await clockAxios.get(`/clock/location`);
    setCompanyLocation({
      lat: data.latitudeCompany,
      lng: data.longitudeCompany,
    });
    setTime(new Date(time.data.datetime));
    //Newest Clock
    const newestClock = await clockAxios.get(
      `/clock/latestClock/?today=${todayString()}`
    );

    //If there's no newest clock from today or the newest clock already has clockout => clock in
    if (!newestClock.data || newestClock.data.clockOutTime) {
      setIsClockIn(true);
    } else {
      setIsClockIn(false);
    }
    setIsLoading(false);
  };
  const fetchClockHistory = async () => {
    try {
      //Only the current date history

      const clockHistory = await clockAxios.get(
        `/clock/?dateStart=${todayString()}&dateEnd=`
      );

      setClockHistory(clockHistory.data);
    } catch (error) {
      console.log(error);
    }
  };
  const clockIn = async (companyLocation, userLocation, time) => {
    try {
      if (isCheckLocation) {
        if (getDistance(companyLocation, location) > 50) {
          return alert("You're out of clock in/out range ; 50 meters");
        }
      }
      const result = await clockAxios.post(
        "clock/clockIn",
        clockObjectChange(
          userLocation,
          time,
          "clockIn",
          todayString(),
          reasonLocation
        )
      );
      fetchClockHistory();
      setIsClockIn(false);
      if (result.data.clockIn.statusClockIn === "LATE") {
        Swal.fire({
          title: "Late Reason",
          input: "text",
          inputPlaceholder: "Please enter your late reason",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        })
          .then((reason) => {
            if (reason.isConfirmed) {
              // User clicked "OK"
              const inputValue = reason.value;
              console.log("User input:", inputValue);
              clockAxios.patch("clock/clockReason", {
                clockId: result.data.clockIn.id,
                reason: inputValue,
              });
            } else {
              clockAxios.patch("clock/clockReason", {
                clockId: result.data.clockIn.id,
                reason: "No reason provided",
              });
            }
          })
          .finally(() => {
            Swal.fire({
              title: "Clock In Late !",
              text: `Start work at ${time.toTimeString().split(" ")[0]}`,
              icon: "info",
            });
            setReasonLocation("");
            setIsCheckLocation(true);
          });
      } else {
        Swal.fire({
          title: "Clock In Success !",
          text: `Start work at ${time.toTimeString().split(" ")[0]}`,
          icon: "success",
        });
        setReasonLocation("");
        setIsCheckLocation(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.response.data.message,
      });
    }
  };
  const clockOut = async (companyLocation, userLocation, time) => {
    try {
      if (isCheckLocation) {
        if (getDistance(companyLocation, location) > 50) {
          return alert("You're out of clock in/out range ; 50 meters");
        }
      }

      await clockAxios.patch(
        "clock/clockOut",
        clockObjectChange(userLocation, time, "clockOut", null, reasonLocation)
      );
      fetchClockHistory();
      setIsClockIn(true);
      Swal.fire({
        title: "Clock Out Success !",
        text: `End work at ${time.toTimeString().split(" ")[0]}`,
        icon: "success",
      });
      setReasonLocation("");
      setIsCheckLocation(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    clockAxios.get("/time/getAllTimeProfile").then((res) => {
      if (!res.data.allTimeProfiles.length) {
        Swal.fire({
          title: "Initial Setting not done",
          text: "Your company time profile has not been set. Please contact your admin",
          icon: "question",
        });
      }
    });
    fetchLocationTime();
    fetchClockHistory();
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
    location,
    clockHistory,
    isCheckLocation,
    setIsCheckLocation,
    setReasonLocation,
  };
  return (
    <ClockContext.Provider value={shareObj}>{children}</ClockContext.Provider>
  );
}
