import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect } from "react";
import { dashboardAxios } from "../../../config/axios";
import { useState } from "react";

export default function DashboardMainPage() {
  const [chartData, setChartData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API using Axios or your preferred method
    dashboardAxios
      .get("user/getPosition")
      .then((response) => {
        const data = response.data; // Ensure the response structure is as expected
        const restructuredData = Object.keys(data.userTypeTotals).map(
          (label, id) => ({
            id,
            value: data.userTypeTotals[label],
            label,
          })
        );
        console.log(restructuredData, "----lsdlskdlsk");
        setChartData(restructuredData); // Set the retrieved data into the state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any errors
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, []);
  return (
    <div>
      {initialLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <PieChart
            series={[
              {
                // data: chartData, // Use the retrieved data
                data: chartData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={200}
          />
          {/* <div>
            <div>
              <div className="flex justify-center items-center text-4xl font-semibold ">
                Welcome to your dashboard, ACB Company
              </div>
              <div>Filter by Date</div>
            </div>
            <div>
              <div>Total Employees</div>
              <div>856</div>
              <div>Employees</div>
            </div>
            <div>
              <div>Late</div>
              <div>3,342</div>
              <div>Viewers</div>
            </div>
            <div>
              <div>Leave</div>
              <div>77</div>
              <div>Applocants</div>
            </div>
            <div>
              <div>OT</div>
              <div>17</div>
              <div>Employees</div>
            </div>
          </div>

          <br />

          <div>
            <div>
              <div>Statistics</div>
              <div>
                <div>On Leave</div>
                <div>OnTime</div>
                <div>Late</div>
              </div>
              <div>graph 75%</div>
            </div>
            <div>
              <div>User Type</div>
              <div>
                <PieChart
                  series={[
                    {
                      // data: chartData, // Use the retrieved data
                      data: chartData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  height={200}
                />
              </div>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
