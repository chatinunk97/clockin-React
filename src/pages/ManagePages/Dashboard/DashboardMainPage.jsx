import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { dashboardAxios } from "../../../config/axios";
import useUser from "../../../hooks/use-user";
import CountUp from "react-countup";

export default function DashboardMainPage() {
  const [chartData, setChartData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const { allUser, getalluser } = useUser();
  // const {}

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
          <div className="bg-orange-300">
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
                  <div className="stat-desc">Persons</div>
                </div>
              </div>

              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">Lates</div>
                  <div className="stat-value text-secondary">
                    <CountUp end={4200} />
                  </div>
                  <div className="stat-desc text-secondary">Persons</div>
                </div>
              </div>

              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">Leave</div>
                  <div className="stat-value">
                    <CountUp end={77} />
                  </div>
                  <div className="stat-desc">Persons</div>
                </div>
              </div>

              <div className="stats shadow p-4 border border-gray-300">
                <div className="stat place-items-center">
                  <div className="stat-title">OT</div>
                  <div className="stat-value">
                    <CountUp end={17} />
                  </div>
                  <div className="stat-desc">Persons</div>
                </div>
              </div>
            </div>

            {/* Other dashboard statistics */}

            <br />
            {/* <div>
              <div>Statistics</div>
              <div>
                <div>On Leave</div>
                <div>On Time</div>
                <div>Late</div>
              </div>
              <div>graph 75%</div>
            </div> */}
            <div>
              <div>User Type</div>
              <div>
                <PieChart
                  series={[
                    {
                      data: chartData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
