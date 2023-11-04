import InfoClockinItem from "./InfoClockinItem";
import ClockInlocation from "./ClockInlocation";
import ClockInHeader from "./ClockInHeader";
import GoogleMap from "../../config/GoogleMap/Map";
import useAuth from "../../hooks/use-auth";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ClockinMainPage() {
  const {
    location,
    initialLoading,
    clockIn,
    isClockin,
    clockOut,
    authUser,
    setIsClockIn,
    setAuthUser
  } = useAuth();
  const [waitTimer, setWaitTimer] = useState(true);
  const [time, setTime] = useState(null);

  const handleClock = async (type) => {
    if (type === "clockOut") {
      const input = {
        id: authUser.clockId,
        latitudeClockOut: location.lat,
        longitudeClockOut: location.lat,
        clockOutTime: time,
      };
      setIsClockIn(true);
      clockOut(input);
      setAuthUser({...authUser , clockId : authUser.clockId ++})
      return
    }
    const input = {
      latitudeClockIn: location.lat,
      longitudeClockIn: location.lat,
      clockInTime: time,
    };
    setIsClockIn(false);
    const result = await clockIn(input);
  };
  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/timezone/json?location=
    ${location.lat}
    ,
    ${location.lng}
    &timestamp=1331161200&key=AIzaSyALKm5K2JFpte9A8cXryHMa2cJR3j7jemo`
      )
      .then((res) => {
        axios
          .get(`http://worldtimeapi.org/api/timezone/${res.data.timeZoneId}`)
          .then((time) => {
            setTime(new Date(time.data.datetime));
            setWaitTimer(false);
          });
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <ClockInHeader time={time} setTime={setTime} waitTimer={waitTimer} />
      </div>
      <div className="overflow-hidden border border-black w-[360px] h-[800px]  md:w-[800px] md:h-[1200x]">
        {initialLoading ? (
          <img src="https://media.tenor.com/Dz9GFJ9ngPQAAAAd/me-waiting-for-v-movie-trailer-on-prime-mr-bean.gif"></img>
        ) : (
          <GoogleMap location={location} />
        )}
      </div>
      <div>
        <ClockInlocation />
      </div>
      <hr className=" w-[360px] md:w-[800px] " />
      <div className="overflow-hidden overflow-y-auto h-[1200px] p-2">
        <InfoClockinItem />
      </div>
      <div className="mt-20 md:mt-8 h-screen">
        {isClockin ? (
          <button
            onClick={handleClock}
            className="bg-green-600 w-[200px] p-4 font-semibold text-white rounded-3xl hover:bg-green-400"
          >
            Clock In
          </button>
        ) : (
          <button
            onClick={() => {
              handleClock("clockOut");
            }}
            className="bg-red-500 w-[200px] p-4 font-semibold text-white rounded-3xl hover:bg-red-700"
          >
            Clock Out
          </button>
        )}
      </div>
    </div>
  );
}
