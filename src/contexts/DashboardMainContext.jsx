import { createContext } from "react";
import { useState } from "react";
import { dashboardAxios } from "../config/axios";
import { useEffect } from "react";
import dayjs from "dayjs";
// import { getYear } from "date-fns";

export const DashboardMainContext = createContext();

export default function DashboardContextProvider({ children }) {
  const [chartData, setChartData] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());
  const [OTInfo, setOTInfo] = useState([]);
  const [clockInfo, setClockInfo] = useState({ clockLate: 0, clockOnTime: 0 });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      console.log(
        `clock/statusClockIn?date=${dayjs(selectDate).format("YYYY-MM")}`
      );
      const employeeInfo = await dashboardAxios.get("user/getPosition");
      const clockInfo = await dashboardAxios.get(
        `clock/statusClockIn?date=${dayjs(selectDate).format("YYYY-MM")}`
      );
      console.log(
        clockInfo.data,
        "+++++++++++++++clockInfo+++++++++++++++++++++"
      );
      const data = await dashboardAxios.get(
        `clock/getAllStatus?date=${dayjs(selectDate).format("YYYY-MM")}`
      );

      const res = await dashboardAxios.get(
        `OT/getAllRequestOTByMonth?date=${dayjs(selectDate).format("YYYY-MM")}`
      );
      console.log(res.data, "ssososososo");
      const OT = res.data.OT["_sum"].totalTime;
      const { totalUserCount, userTypeTotals } = employeeInfo.data;
      const { lateClockInsCount } = clockInfo.data;
      let { requestLeaveCounts, statusCounts } = data.data;
      console.log(statusCounts);

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
          unit: "Persons",
        },
        {
          title: "Lates",
          count: lateClockInsCount,
          color: "text-pink-500",
          unit: "Persons",
        },
        {
          title: "Leave",
          count: requestLeaveCounts.length,
          color: "text-black",
          unit: "Persons",
        },
        { title: "OT", count: OT, unit: "Hours" },
      ]);

      setClockInfo({
        onLeave: requestLeaveCounts[0] ? requestLeaveCounts[0]["_count"] : 0,
        clockLate: statusCounts[0] ? statusCounts[0]["_count"] : 0,
        clockOnTime: statusCounts[1] ? statusCounts[1]["_count"] : 0,
        allClock:
          (requestLeaveCounts[0] ? requestLeaveCounts[0]["_count"] : 0) +
          (statusCounts[1] ? statusCounts[1]["_count"] : 0) +
          (statusCounts[0] ? statusCounts[0]["_count"] : 0),
      });

      setOTInfo({
        count: OT._count,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [selectDate]);
  console.log(clockInfo, "%%%%%%%%%%%%%%%%%%%clockInfo%%%%%%%%%%%%%%%%");
  const contextValue = {
    fetchEmployees,
    chartData,
    setChartData,
    cardInfo,
    clockInfo,
    OTInfo,
    loading,
    selectDate,
    setSelectDate,
  };

  return (
    <DashboardMainContext.Provider value={contextValue}>
      {children}
    </DashboardMainContext.Provider>
  );
}
