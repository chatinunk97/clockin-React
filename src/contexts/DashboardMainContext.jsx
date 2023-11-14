import { createContext } from "react";
import { useState } from "react";
import { dashboardAxios } from "../config/axios";

export const DashboardMainContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [statusList, setStatusList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);

  // Expose the state and the function to update it in the context
  //Fetch Total Employee , full / part time
  const fetchEmployees = async () => {
    try {
      const employeeInfo = await dashboardAxios.get("user/getPosition");
      const clockInfo = await dashboardAxios.get("clock/statusClockIn");
      const data = await dashboardAxios.get("clock/getAllStatus");
      const { totalUserCount, userTypeTotals } = employeeInfo.data;
      const { lateClockInsCount } = clockInfo.data;
      const { requestLeaveCounts, statusCounts } = data.data;
      setCardInfo([
        {
          title: "Total Employees",
          count: totalUserCount,
          color: "text-black",
        },
        { title: "Lates", count: lateClockInsCount, color: "text-pink-500" },
        {
          title: "Leave",
          count: requestLeaveCounts.length,
          color: "text-black",
        },
        { title: "OT", count: 10002000, color: "text-black" },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    fetchEmployees,
    statusList,
    setStatusList,
    chartData,
    setChartData,
    cardInfo,
  };

  return (
    <DashboardMainContext.Provider value={contextValue}>
      {children}
    </DashboardMainContext.Provider>
  );
}
