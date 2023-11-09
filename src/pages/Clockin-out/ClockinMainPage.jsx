import InfoClockinItem from "./InfoClockinItem";
import ClockInlocation from "./ClockInlocation";
import ClockInHeader from "./ClockInHeader";
import GoogleMap from "../../config/GoogleMap/Map";
import useAuth from "../../hooks/use-auth";
import LoadingBar from "../../components/LoadingBar";
import useClock from "../../hooks/use-clock";
import SubmitButton from "../../components/SubmitButton";
export default function ClockinMainPage() {
  const { authUser } = useAuth();
  const { location } = useClock();
  const {
    isClockIn,
    companyLocation,
    isLoading,
    time,
    setTime,
    clockIn,
    clockOut,
  } = useClock();

  const handleClock = async () => {
    if (isClockIn) {
      return clockIn(companyLocation, location, time);
    }
    return clockOut(companyLocation, location, time);
  };
  return (
    <div>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <ClockInHeader time={time} setTime={setTime} authUser={authUser} />
          <div className="overflow-hidden border border-black w-[360px] h-[800px]  md:w-[800px] md:h-[1200x]">
            <GoogleMap location={location} companyLocation={companyLocation} />
          </div>
          <ClockInlocation />
          <hr className=" w-[360px] md:w-[800px] " />
          <div className="overflow-hidden overflow-y-auto h-[1200px] p-2">
            <InfoClockinItem />
          </div>
          <div className="mt-20 md:mt-8 h-screen">
            <SubmitButton
              bg={isClockIn ? "bg-green-600" : "bg-orange-600"}
              onClick={handleClock}
              className={`${
                isClockIn ? "hover:bg-green-400" : "hover:bg-orange-400"
              } w-[200px] p-4 font-semibold text-white rounded-3xl `}
            >
              {isClockIn ? "Clock In" : "Clock Out"}
            </SubmitButton>
          </div>
        </div>
      )}
    </div>
  );
}
