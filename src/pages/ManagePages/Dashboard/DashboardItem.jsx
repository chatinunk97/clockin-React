import { useState, useEffect } from "react";
import { BsPersonFill, BsAlarm } from "react-icons/bs";
import { TbFileCheck } from "react-icons/tb";
import useDashboard from "../../../hooks/use-dashboard";

export default function DashboardItem({ handleChangeDisplay }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const { statusList, clockInfo } = useDashboard();

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  return (
    <div>
      <div>
        {initialLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className="font-semibold">
            <div
              className="flex flex-row items-center gap-4 p-4"
              onClick={() =>
                handleChangeDisplay("On Leave", statusList[0]?.count)
              }
            >
              <div className="rounded-full bg-blue-500 text-2xl  text-white hover hover:text-blue-500 p-2 hover:bg-white border border-blue-500">
                <BsPersonFill />
              </div>
              <div>
                <div className="text-gray-500">On Leave</div>
                <div>
                  {statusList[0]?.count}
                  <span>%</span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row  items-center gap-4 p-4"
              onClick={() =>
                handleChangeDisplay(
                  "On Time",
                  Math.round((clockInfo.clockOnTime / clockInfo.allClock) * 100)
                )
              }
            >
              <div className="rounded-full bg-green-600 text-2xl  text-white hover hover:text-green-600 p-2 hover:bg-white border border-green-600">
                <TbFileCheck />
              </div>
              <div>
                <div className="text-gray-500 font-semibold">On Time</div>
                <div>
                  {Math.round(
                    (clockInfo.clockOnTime / clockInfo.allClock) * 100
                  )}
                  <span>%</span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row items-center gap-4 p-4"
              onClick={() =>
                handleChangeDisplay(
                  "Late",
                  Math.round((clockInfo.clockLate / clockInfo.allClock) * 100)
                )
              }
            >
              <div className="rounded-full bg-orange-500 text-2xl  text-white hover hover:text-orange-500 p-2 hover:bg-white border border-orange-500">
                <BsAlarm />
              </div>
              <div>
                <div className="text-gray-500 font-semibold">Late</div>
                <div>
                  {Math.round((clockInfo.clockLate / clockInfo.allClock) * 100)}
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
