import { FcOvertime } from "react-icons/fc";

export default function OTCard({ OT }) {
  const formattedStartTime = OT?.startTime ? OT.startTime.slice(0, 5) : "";
  const formattedEndTime = OT?.endTime ? OT.endTime.slice(0, 5) : "";

  return (
    <div className="w-full h-36 border border-stone-200 rounded-2xl flex shadow-lg">
      <div className="flex h-full items-center p-2 justify-start gap-6 w-full">
        <div className="text-5xl">
          <FcOvertime />
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <h1> Date : {OT?.clock?.clockInTime.split("T")[0]}</h1>
            <h1 className="flex gap-2">
              <h1>From: </h1> {formattedStartTime}
            </h1>
            <h1 className="flex gap-2">
              <h1>To: </h1> {formattedEndTime}
            </h1>
            <h1>Message OT : {OT?.messageOT}</h1>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-end">
        <h1 className="text-orange-400 font-semibold">
          {OT?.statusOT}
        </h1>
      </div>
    </div>
  );
}
