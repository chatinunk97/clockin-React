import { PieChart } from "@mui/x-charts/PieChart";

import { dashboardAxios } from "../../../config/axios";
import { useState, useEffect } from "react";
import useUser from "../../../hooks/use-user";
import CountUp from "react-countup";
import DashboardItem from "./DashboardItem";

export default function DashboardMainPage() {
  const [chartData, setChartData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const { allUser, getalluser } = useUser();

  useEffect(() => {
    // Fetch data from the API using Axios or your preferred method
    dashboardAxios
      .get("user/getPosition")
      .then((response) => {
        const data = response.data;
        // const { totalUserCount } = data;

        const restructuredData = Object.keys(data.userTypeTotals).map(
          (label, id) => ({
            id,
            value: data.userTypeTotals[label],
            label,
          })
        );
        setChartData(restructuredData);
        getalluser();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);
  console.log(allUser);

  return (
    <div className=" w-full">
      <div>
        {initialLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className="bg-orange-300 w-full h-screen">
            <div className="flex justify-evenly pt-5 text-4xl font-semibold text-center mb-4">
              Welcome to your dashboard, ACB Company
              <select className="select w-full max-w-xs">
                <option disabled selected>
                  Filter by Date
                </option>
                <option>Homer</option>
                <option>Marge</option>
                <option>Bart</option>
                <option>Lisa</option>
                <option>Maggie</option>
              </select>
            </div>

            <div className="m-5 gap-6 grid grid-cols-2 sm:grid-cols-4">
              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">Total Employees</div>
                  <div className="stat-value">
                    <CountUp end={allUser.length} />
                  </div>
                  <div className="stat-desc">Employees</div>
                </div>
              </div>

              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">Lates</div>
                  <div className="stat-value text-secondary">
                    <CountUp end={4200} />
                  </div>
                  <div className="stat-desc text-secondary">Viewers</div>
                </div>
              </div>

              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">Leave</div>
                  <div className="stat-value">
                    <CountUp end={77} />
                  </div>
                  <div className="stat-desc">Applicants</div>
                </div>
              </div>

              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">OT</div>
                  <div className="stat-value">
                    <CountUp end={17} />
                  </div>
                  <div className="stat-desc">Employee</div>
                </div>
              </div>
            </div>

            <br />
            <div className="flex w-full  justify-evenly items-start ">
              <div className="flex flex-col border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px]">
                <div className="font-semibold text-xl p-2 ">Statistics</div>
                <div className="flex flex-row gap-10">
                  <DashboardItem />
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className="radial-progress text-primary"
                      style={{ "--value": 75, "--size": "10rem" }}
                      role="progressbar"
                    >
                      75%
                    </div>
                    <div className="text-center font-semibold text-lg selection:text-center p-4">
                      XXXXXXX
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px]">
                <div className="font-semibold text-xl p-2 ">User Type</div>
                <div>
                  <PieChart
                    series={[
                      {
                        // data: chartData, // Use the retrieved data
                        data: chartData,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    height={200}
                    width={405}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
