import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import useUser from "../../../hooks/use-user";
import DashboardItem from "./DashboardItem";
import DashboardSelectBox from "../../../components/DashboardSelectBox";
import DashboardPieChart from "../../../components/DashboardPieChart";
import useDashboard from "../../../hooks/use-dashboard";
import DashboardCard from "../../../components/DashboardCard";

export default function DashboardMainPage() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [displayInfo, setDisplayInfo] = useState({
    name: "",
    count: 100,
  });
  const { allUser, getalluser } = useUser();
  const { chartData, fetchChartData } = useDashboard();

  useEffect(() => {
    getalluser().then(() => {
      console.log("finish getalluser data");
    });
    fetchChartData()
      .then(() => {
        console.log("finish fetching data");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);

  const handleChangeDisplay = (name, count) => {
    let newInfo = {
      name,
      count,
    };
    setDisplayInfo(newInfo);
  };

  return (
    <div className=" w-full">
      <div>
        {initialLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className=" w-full h-screen">
            <div className="flex justify-evenly text-4xl font-semibold text-center mb-4 pt-24">
              <div>Welcome to your dashboard, ACB Company</div>
              <DashboardSelectBox />
            </div>
            <DashboardCard allUser={allUser} />

            <br />
            <div className="flex flex-col md:flex-row sm:flex-row w-full justify-evenly items-start ">
              <div className=" bg-white shadow  border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px]">
                <div className="font-semibold text-xl p-2 ">Statistics</div>
                <div className="flex flex-row gap-10">
                  <DashboardItem handleChangeDisplay={handleChangeDisplay} />
                  <div className="flex flex-col items-center justify-center">
                    <CircularProgress
                      variant="determinate"
                      value={displayInfo.count}
                      size={"10rem"}
                      color={"success"}
                    />
                    <div className="text-center font-semibold text-lg selection:text-center p-4">
                      {displayInfo.name} <span>{displayInfo.count} % </span>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className=" bg-white shadow border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px]">
                <div className="font-semibold text-xl p-2 ">User Type</div>
                <DashboardPieChart chartData={chartData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
