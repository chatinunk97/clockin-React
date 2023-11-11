import ClockInlocation from "./ClockInlocation";
import ClockInHeader from "./ClockInHeader";
import GoogleMap from "../../config/GoogleMap/Map";
import useAuth from "../../hooks/use-auth";
import LoadingBar from "../../components/LoadingBar";
import useClock from "../../hooks/use-clock";
import SubmitButton from "../../components/SubmitButton";
import InfoClockinList from "./InfoClockinList";
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
    clockHistory,
    address,
  } = useClock();

  const handleClock = async () => {
    if (isClockIn) {
      return clockIn(companyLocation, location, time);
    }
    return clockOut(companyLocation, location, time);
  };
  return (
    <>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <div className="h-[21%]">
            <ClockInHeader time={time} setTime={setTime} authUser={authUser} />
          </div>
          <div className="h-[29%]">
            <GoogleMap location={location} companyLocation={companyLocation} />
          </div>
          <div className="h-[10%]">
            <ClockInlocation address={address} />
          </div>
          <hr></hr>
          <div className="h-[23%] overflow-auto">
            <InfoClockinList clockHistory={clockHistory} />
          </div>
          <div className="h-[17%] flex justify-center items-center px-2">
            <SubmitButton
              w={"w-full"}
              bg={isClockIn ? "bg-green-600" : "bg-orange-600"}
              onClick={handleClock}
              className={`${
                isClockIn ? "hover:bg-green-400" : "hover:bg-orange-400"
              } w-[200px] p-4 font-semibold text-white rounded-3xl `}
            >
              {isClockIn ? "Clock In" : "Clock Out"}
            </SubmitButton>
          </div>
        </>
      )}
    </>
  );
}

