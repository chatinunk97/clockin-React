import ClockInlocation from "./ClockInLocation";
import ClockInHeader from "./ClockInHeader";
import GoogleMap from "../../config/GoogleMap/Map";
import useAuth from "../../hooks/use-auth";
import LoadingBar from "../../components/LoadingBar";
import useClock from "../../hooks/use-clock";
import SubmitButton from "../../components/SubmitButton";
import InfoClockinList from "./InfoClockinList";
import Modal from "../../components/Modal";
import { useState } from "react";
import InfoClockinItem from "./InfoClockinItem";
import dateTimeToString from "../../utils/StructureChange/dateTimetoString";
export default function ClockinMainPage() {
  const { authUser } = useAuth();
  const { location } = useClock();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isClockIn,
    companyLocation,
    isLoading,
    time,
    setTime,
    clockIn,
    clockOut,
    clockHistory,
    isCheckLocation,
    setIsCheckLocation,
    setReasonLocation,
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
          <div className="h-[7%]">
            <ClockInlocation
              checked={isCheckLocation}
              setChecked={setIsCheckLocation}
              setReasonLocation={setReasonLocation}
            />
          </div>
          <hr></hr>
          <div
            className="h-[26%] overflow-auto cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <InfoClockinList clockHistory={clockHistory} />
            <Modal
              title="Today Clock Record"
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <div className="flex flex-col  h-full px-3">
                {clockHistory.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className="flex gap-2 justify-center items-center w-full h-full p-2"
                    >
                      <InfoClockinItem
                        clockTime={dateTimeToString(el.clockInTime)}
                        type={"Clock In"}
                      />
                      <InfoClockinItem
                        clockTime={dateTimeToString(el.clockOutTime)}
                        type={"Clock Out"}
                      />
                    </div>
                  );
                })}
              </div>
            </Modal>
          </div>
          <div className="h-[17%] flex justify-center items-center px-2">
            <SubmitButton
              textSize="text-2xl"
              w={"w-full"}
              bg={isClockIn ? "bg-green-600" : "bg-orange-600"}
              onClick={handleClock}
              className={`${
                isClockIn ? "hover:bg-green-400" : "hover:bg-orange-400"
              } w-[200px] p-4 font-bold text-white rounded-3xl `}
            >
              {isClockIn ? "Clock In" : "Clock Out"}
            </SubmitButton>
          </div>
        </>
      )}
    </>
  );
}
