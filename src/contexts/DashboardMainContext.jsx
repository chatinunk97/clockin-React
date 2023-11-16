import { createContext } from "react";
import { useState } from "react";
import { dashboardAxios } from "../config/axios";

export const DashboardMainContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [statusList, setStatusList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clockInfo, setClockInfo] = useState({ clockLate: 0, clockOnTime: 0 });

  // Expose the state and the function to update it in the context
  //Fetch Total Employee , full / part time
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const employeeInfo = await dashboardAxios.get("user/getPosition");
      const clockInfo = await dashboardAxios.get("clock/statusClockIn");
      const data = await dashboardAxios.get("clock/getAllStatus");
      const { totalUserCount, userTypeTotals } = employeeInfo.data;
      const { lateClockInsCount } = clockInfo.data;
      const { requestLeaveCounts, statusCounts } = data.data;
      setChartData([
        {
          title: "Full-time",
          count: userTypeTotals.FULLTIME,
        },
        {
          title: "Part-time",
          count: userTypeTotals.PARTTIME,
        },
      ]);
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

      setStatusList([
        {
          title: "statusCounts",
          count: requestLeaveCounts.length,
          color: "text-black",
        },
        {
          title: "statusCounts",
          count: requestLeaveCounts.length,
          color: "text-black",
        },
        {
          title: "Late",
          count: requestLeaveCounts.length,
          color: "text-black",
        },
        {},
      ]);

      setClockInfo({
        clockLate: statusCounts[0]["_count"],
        clockOnTime: statusCounts[1]["_count"],
        allClock: statusCounts[0]["_count"] + statusCounts[1]["_count"],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    fetchEmployees,
    statusList,
    setStatusList,
    chartData,
    setChartData,
    cardInfo,
    clockInfo,
    loading,
  };

  return (
    <DashboardMainContext.Provider value={contextValue}>
      {children}
    </DashboardMainContext.Provider>
  );
}
