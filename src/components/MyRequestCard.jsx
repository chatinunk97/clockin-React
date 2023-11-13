import { FcOvertime } from "react-icons/fc";

export default function MyRequestCard({ myrequestLeave }) {
  const startDate = myrequestLeave?.startDate
    ? new Date(myrequestLeave.startDate)
    : null;
  const endDate = myrequestLeave?.endDate
    ? new Date(myrequestLeave.endDate)
    : null;

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("th-TH", options);
  };
  return (
    <div className="w-full h-36 border border-stone-200 rounded-2xl flex shadow-lg">
      <div className="flex h-full items-center p-2 justify-start gap-6 w-full">
        <div className="text-5xl">
          <FcOvertime />
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <h1 className="text-green-700 font-semibold">
              StartDate: {formatDate(startDate)}
            </h1>
            <h1 className="text-green-700 font-semibold">
              EndDate: {formatDate(endDate)}
            </h1>
            <h1>{myrequestLeave?.leaveType}</h1>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-end">
        <h1 className="text-orange-400 font-semibold">
          {myrequestLeave?.statusRequest}
        </h1>
      </div>
    </div>
  );
}
