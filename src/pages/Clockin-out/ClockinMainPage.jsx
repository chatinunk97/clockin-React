import InfoClockinItem from "./InfoClockinItem";
import ClockInlocation from "./ClockInlocation";
import ClockInHeader from "./ClockInHeader";
import GoogleMap from "../../config/GoogleMap/Map";
import useAuth from "../../hooks/use-auth";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingBar from "../../components/LoadingBar";
import { clockAxios } from "../../config/axios";
import SubmitButton from "../../components/SubmitButton";
export default function ClockinMainPage() {
  const { location, clockIn } = useAuth();
  const [isClockIn, setIsClockIn] = useState(true);
  const [companyLocation, setCompanyLocation] = useState({ lat: "", lng: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [waitTimer, setWaitTimer] = useState(true);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
      if(!latestClock){
        setIsClockIn(false)
      }else{
        setIsClockIn(true)
      }
      setWaitTimer(false);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleClock = async () => {
    if(isClockIn){
      return clockIn(companyLocation, location, time);
    }
    return clockOut(companyLocation, location, time)
  };
  return (
    <div>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <div>
            <ClockInHeader
              time={time}
              setTime={setTime}
              waitTimer={waitTimer}
            />
          </div>
          <div className="overflow-hidden border border-black w-[360px] h-[800px]  md:w-[800px] md:h-[1200x]">
            <GoogleMap location={location} companyLocation={companyLocation} />
          </div>
          <div>
            <ClockInlocation />
          </div>
          <hr className=" w-[360px] md:w-[800px] " />
          <div className="overflow-hidden overflow-y-auto h-[1200px] p-2">
            <InfoClockinItem />
          </div>
          <div className="mt-20 md:mt-8 h-screen">
              <SubmitButton
                onClick={handleClock}
                className={`${isClockIn ? 'bg-green-600':'bg-orange-600' } w-[200px] p-4 font-semibold text-white rounded-3xl hover:bg-green-400`}
              >
                {isClockIn ? 'Clock In':'Clock Out' }
              </SubmitButton>
          </div>
        </div>
      )}
    </div>
  );
}
