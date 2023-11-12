import { useState, createContext, useEffect } from "react";
import { dashboardAxios } from "../config/axios";

export const DashboardMainContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [lateClockInsCount, setClockInsCount] = useState(0);
  const [statusList, setStatusList] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchLateClockInsCount = async () => {
    try {
      const response = await dashboardAxios.get("clock/statusClockIn");
      setClockInsCount(response.data.lateClockInsCount);
    } catch (error) {
      console.error("Error fetching late clock-ins count:", error);
      // Handle errors if needed
    }
  };

  const fetchStatusList = async () => {
    try {
      const response = await dashboardAxios.get("clock/getAllStatus");
      setStatusList(response.data);
    } catch (error) {
      console.log("Error fetching percentage of status:", error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await dashboardAxios.get("user/getPosition");
      const data = response.data;
      const restructuredData = Object.keys(data.userTypeTotals).map(
        (label, id) => ({
          id,
          value: data.userTypeTotals[label],
          label,
        })
      );
      setChartData(restructuredData);
    } catch (error) {
      console.log("Error fetching chart data:", error);
    }
  };

  // Fetch the late clock-ins count when the component mounts
  useEffect(() => {
    fetchLateClockInsCount();
    fetchStatusList();
    fetchChartData();
  }, []);

  // Expose the state and the function to update it in the context
  const contextValue = {
    lateClockInsCount,
    fetchLateClockInsCount,
    statusList,
    setStatusList,
    fetchStatusList,
    chartData,
    setChartData,
    fetchChartData,
  };

  return (
    <DashboardMainContext.Provider value={contextValue}>
      {children}
    </DashboardMainContext.Provider>
  );
}
