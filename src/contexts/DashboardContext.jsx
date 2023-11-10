import { useState, createContext, useEffect } from "react";
import { dashboardAxios } from "../config/axios";

export const DashboardContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [lateClockInsCount, setClockInsCount] = useState(0);

  const fetchLateClockInsCount = async () => {
    try {
      const response = await dashboardAxios.get("clock/statusClockIn");
      setClockInsCount(response.data.lateClockInsCount);
    } catch (error) {
      console.error("Error fetching late clock-ins count:", error);
      // Handle errors if needed
    }
  };

  // Fetch the late clock-ins count when the component mounts
  useEffect(() => {
    fetchLateClockInsCount();
  }, []);

  // Expose the state and the function to update it in the context
  const contextValue = {
    lateClockInsCount,
    fetchLateClockInsCount,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}
