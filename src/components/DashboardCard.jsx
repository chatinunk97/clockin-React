import { useState, useEffect } from "react";
import CountUp from "react-countup";
import useDashboard from "../hooks/use-dashboard";

export default function DashboardCard({ allUser }) {
  const { statusList, fetchStatusList } = useDashboard();
  const [initialLoading, setInitialLoading] = useState(true);
  const [cardInfo, setCardInfo] = useState([
    { title: "Total Employees", count: 0, color: "text-black" },
    { title: "Lates", count: 0, color: "text-pink-500" },
    { title: "Leave", count: 0, color: "text-black" },
    { title: "OT", count: 0, color: "text-black" },
  ]);

  const calculateInfo = () => {
    const late =
      statusList?.statusCounts?.length > 0
        ? statusList.statusCounts[0]._count
        : 0;

    const leave =
      statusList?.requestLeaveCounts?.length > 0
        ? statusList.requestLeaveCounts[0]._count
        : 0;

    let updateInfo = cardInfo;

    updateInfo.map((item) => {
      if (item.title === "Total Employees") {
        item.count += allUser.length;
      }
      if (item.title === "Lates") {
        item.count += late;
      }
      if (item.title === "Leave") {
        item.count += leave;
      }
      if (item.title === "OT") {
        // item.count += late;
      }
    });

    setCardInfo(updateInfo);
  };

  useEffect(() => {
    fetchStatusList()
      .then(() => {
        calculateInfo();
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);

  return (
    <div className="m-5 gap-6 grid grid-cols-2 sm:grid-cols-4">
      {initialLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {cardInfo?.map((card) => {
            return (
              <div
                className="bg-white shadow p-4 border border-gray-300 rounded-2xl inline-grid"
                key={card.title}
              >
                <div className="place-items-center inline-grid gap-4 px-6 py-4 ">
                  <div className="text-sm font-medium text-gray-500">
                    {card.title}
                  </div>
                  <div
                    className={`text-4xl leading-10 font-extrabold ${card.color}`}
                  >
                    <CountUp end={card.count} />
                  </div>
                  <div className="text-xs font-medium text-gray-400">
                    Persons
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
