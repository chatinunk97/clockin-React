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
    try {
      // Step 1: Get User Location
      const userLocation = await locationPermission();
      setLocation(userLocation);

      // Step 2: Get Current UTC Timestamp
      const timestamp = Math.floor(Date.now() / 1000); // Convert to UNIX seconds

      // Step 3: Fetch Time Zone Data from Google
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${
          userLocation.lat
        },${userLocation.lng}&timestamp=${timestamp}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`
      );

      if (res.data.status !== "OK") {
        throw new Error("Failed to fetch time zone data");
      }

      // Step 4: Calculate Local Time
      const { rawOffset, dstOffset, timeZoneId } = res.data;
      const totalOffset = rawOffset + dstOffset; // Offset in seconds

      const utcTime = new Date(); // Current UTC time
      const localTime = new Date(utcTime.getTime() + totalOffset * 1000); // Adjusted local time

      setTime(localTime);

      console.log(`User Timezone: ${timeZoneId}`);
      console.log(`Local Time: ${localTime.toLocaleString()}`);

      // Step 5: Get Company Location
      const { data } = await clockAxios.get(`/clock/location`);
      setCompanyLocation({
        lat: data.latitudeCompany,
        lng: data.longitudeCompany,
      });

      // Step 6: Fetch Clock History
      const newestClock = await clockAxios.get(
        `/clock/latestClock/?today=${todayString()}`
      );

      // Step 7: Determine Clock-in/Clock-out Status
      if (!newestClock.data || newestClock.data.clockOutTime) {
        setIsClockIn(true);
      } else {
        setIsClockIn(false);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching time:", error);
      Swal.fire({
        icon: "error",
        title: "Time Fetch Error",
        text: "Could not fetch local time. Please try again.",
      });
    }
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
