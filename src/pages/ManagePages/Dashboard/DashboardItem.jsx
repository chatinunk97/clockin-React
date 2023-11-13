import { useState, useEffect } from "react";
import { BsPersonFill, BsAlarm } from "react-icons/bs";
import { TbFileCheck } from "react-icons/tb";
import useDashboard from "../../../hooks/use-dashboard";

const ACCEPT = "ACCEPT";
const LATE = "LATE";
const ONTIME = "ONTIME";

export default function DashboardItem({ handleChangeDisplay }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [dashboardInfo, setDashboardInfo] = useState({
    countOnLeave: 0,
    countOnTime: 0,
    countLate: 0,
  });

  const { statusList, fetchStatusList } = useDashboard();

  const calculateStatus = async () => {
    // Count total
    let totalRequestLeaveCounts = statusList.requestLeaveCounts?.reduce(
      (acc, curr) => {
        return (acc += curr._count);
      },
      0
    );

    let totalStatusCounts = statusList.statusCounts?.reduce((acc, curr) => {
      return (acc += curr._count);
    }, 0);

    // Calculate percentage
    let accept = 0;
    let late = 0;
    let onTime = 0;

    statusList.requestLeaveCounts?.forEach((item) => {
      if (item.statusRequest === ACCEPT) {
        accept = Math.round((item._count / totalRequestLeaveCounts) * 100);
      }
    });

    statusList.statusCounts?.forEach((item) => {
      if (item.statusClockIn === LATE) {
        late = Math.round((item._count / totalStatusCounts) * 100);
      } else if (item.statusClockIn === ONTIME) {
        onTime = Math.round((item._count / totalStatusCounts) * 100);
      }
    });

    // Export object for use
    let calculateObject = {
      countOnLeave: accept,
      countOnTime: onTime,
      countLate: late,
    };

    setDashboardInfo({ ...dashboardInfo, ...calculateObject });
  };

  useEffect(() => {
    fetchStatusList()
      .then(() => {
        calculateStatus();
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setInitialLoading(false);
      });
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
                handleChangeDisplay("On Leave", dashboardInfo.countOnLeave)
              }
            >
              <div className="rounded-full bg-blue-500 text-2xl  text-white hover hover:text-blue-500 p-2 hover:bg-white border border-blue-500">
                <BsPersonFill />
              </div>
              <div>
                <div className="text-gray-500">On Leave</div>
                <div>
                  {dashboardInfo.countOnLeave}
                  <span>%</span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row  items-center gap-4 p-4"
              onClick={() =>
                handleChangeDisplay("On Time", dashboardInfo.countOnTime)
              }
            >
              <div className="rounded-full bg-green-600 text-2xl  text-white hover hover:text-green-600 p-2 hover:bg-white border border-green-600">
                <TbFileCheck />
              </div>
              <div>
                <div className="text-gray-500 font-semibold">On Time</div>
                <div>
                  {dashboardInfo.countOnTime}
                  <span>%</span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row items-center gap-4 p-4"
              onClick={() =>
                handleChangeDisplay("Late", dashboardInfo.countLate)
              }
            >
              <div className="rounded-full bg-orange-500 text-2xl  text-white hover hover:text-orange-500 p-2 hover:bg-white border border-orange-500">
                <BsAlarm />
              </div>
              <div>
                <div className="text-gray-500 font-semibold">Late</div>
                <div>
                  {dashboardInfo.countLate}
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
