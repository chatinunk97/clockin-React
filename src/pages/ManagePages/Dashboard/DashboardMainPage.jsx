import BarChart from "./BarChart";
import { useState } from "react";

export default function DashboardMainPage() {
  const [userData, setUserData] = useState({
    labels: userData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: userData.map((data) => data.userGain),
      },
    ],
  });
  return (
    <div>
      <BarChart charData={userData} />
    </div>
  );
}
