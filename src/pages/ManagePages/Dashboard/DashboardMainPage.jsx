import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import DashboardItem from "./DashboardItem";
import DashboardSelectBox from "../../../components/DashboardSelectBox";
import DashboardCard from "../../../components/DashboardCard";
import useManage from "../../../hooks/use-manage";
import useDashboard from "../../../hooks/use-dashboard";
import DashboardPieChart from "../../../components/DashboardPieChart";

export default function DashboardMainPage() {
  const { manageUser } = useManage();
  const { chartData, loading, clockInfo, selectDate } = useDashboard();
  const [initialLoading, setInitialLoading] = useState(true);
  const [displayInfo, setDisplayInfo] = useState({
    name: "",
    count: 0,
  });
  useEffect(() => {
    setInitialLoading(false);
  }, []);

  useEffect(() => {
    setDisplayInfo({
      name: "",
      count: 0,
    });
  }, [selectDate]);

  console.log(
    "--------------------------------------------------------------------------"
  );

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
            <div className="flex  max-lg:flex-col justify-evenly text-4xl font-semibold text-center mb-4 pt-24 ">
              <div>
                Welcome to your dashboard,
                {manageUser?.companyProfile?.companyName}
              </div>
              <DashboardSelectBox />
            </div>
            <DashboardCard />
            <br />
            <div className="flex flex-col md:flex-row sm:flex-row w-full justify-evenly items-start ">
              <div className=" bg-white shadow  border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px]">
                <div className="font-semibold text-xl p-2 ">Statistics</div>
                <div className="flex flex-row gap-10">
                  <DashboardItem
                    handleChangeDisplay={handleChangeDisplay}
                    clockInfo={clockInfo}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <div className=" relative">
                      <div className="z-20">
                        <CircularProgress
                          variant="determinate"
                          value={displayInfo.count}
                          size={"10rem"}
                          color={"success"}
                          className="z-10 inline"
                        />
                      </div>
                      <div className="absolute top-0 z-10 fill-red500 opacity-10">
                        <CircularProgress
                          variant="determinate"
                          value={100}
                          size={"10rem"}
                          color={"inherit"}
                          className="inline"
                        />
                      </div>
                    </div>
                    <div className="text-center font-semibold text-lg selection:text-center p-4">
                      {displayInfo.name} <span>{displayInfo.count} % </span>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="bg-white shadow relative border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px] overflow-hidden">
                <div className="font-semibold text-xl p-2">Employee Type</div>
                <div className="flex justify-center mt-2 items-center h-[215px] w-[215px] mx-auto">
                  <DashboardPieChart chartData={chartData} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
