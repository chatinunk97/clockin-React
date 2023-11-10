import { useState, useEffect } from "react";
import { BsPersonFill, BsAlarm } from "react-icons/bs";
import { TbFileCheck } from "react-icons/tb";
import useDashboard from "../../../hooks/use-dashboard";
export default function DashboardItem() {
  const [initialLoading, setInitialLoading] = useState(true);

  const { statusList } = useDashboard();
  console.log(statusList);

  useEffect(() => {
    // dashboardAxios
    //   .get("clock/getAllStatus")
    //   .then((res) => {
    //     setStatus(res.data);
    //     console.log(res.data);
    //   })
    statusList
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
            <div className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-blue-500 text-2xl  text-white hover hover:text-blue-500 p-2 hover:bg-white border border-blue-500">
                <BsPersonFill />
              </div>
              <div>
                <div className="text-gray-500">On Leave</div>
                <div>90%</div>
              </div>
            </div>
            <div className="flex flex-row  items-center gap-4 p-4">
              <div className="rounded-full bg-green-600 text-2xl  text-white hover hover:text-green-600 p-2 hover:bg-white border border-green-600">
                <TbFileCheck />
              </div>
              <div>
                <div className="text-gray-500 font-semibold">On Time</div>
                <div>{statusList.percentageOntime}%</div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 p-4">
              <div className="rounded-full bg-orange-500 text-2xl  text-white hover hover:text-orange-500 p-2 hover:bg-white border border-orange-500">
                <BsAlarm />
              </div>
              <div>
                <div className="text-gray-500 font-semibold">Late</div>
                <div>{statusList.percentageLate}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
