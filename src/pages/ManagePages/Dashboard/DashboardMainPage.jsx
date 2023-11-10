import { PieChart } from "@mui/x-charts/PieChart";
import { BsPersonFill, BsAlarm } from "react-icons/bs";
import { TbFileCheck } from "react-icons/tb";
import { dashboardAxios } from "../../../config/axios";
import { useState, useEffect } from "react";

export default function DashboardMainPage() {
  const [chartData, setChartData] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  // const DashboardStatistics = [
  //   { id: 1, Icon: BsPersonFill, text: "On Leave" },
  //   { id: 2, Icon: TbFileCheck, text: "On Time" },
  //   { id: 3, Icon: BsAlarm, text: "Late" },
  // ];

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
        console.log(restructuredData, "----Alohaaaa");
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
    <div className=" w-full">
      {initialLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {/* <PieChart
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
            width={400}
          /> */}
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
          </div> */}

          <br />

          <div className="flex w-full  justify-evenly items-start ">
            <div className="flex flex-col border-gray-300 border-2 rounded-md p-4 h-[320px] w-[440px]">
              <div className="font-semibold text-xl p-2 ">Statistics</div>
              <div className="flex flex-row gap-10">
                <div className="font-semibold">
                  <div className="flex flex-row items-center gap-4 p-4">
                    <div className="rounded-full bg-blue-500 text-2xl  text-white hover hover:text-blue-500 p-2 hover:bg-white border border-blue-500">
                      <BsPersonFill />
                    </div>
                    <div>
                      <div className="text-gray-500">On Leave</div>
                      <div>90%</div>
                    </div>
                  </div>
                  <div className="flex flex-row  items-center gap-4 p-4">
                    <div className="rounded-full bg-green-600 text-2xl  text-white hover hover:text-green-600 p-2 hover:bg-white border border-green-600">
                      <TbFileCheck />
                    </div>
                    <div>
                      <div className="text-gray-500 font-semibold">On Time</div>
                      <div>90%</div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4 p-4">
                    <div className="rounded-full bg-orange-500 text-2xl  text-white hover hover:text-orange-500 p-2 hover:bg-white border border-orange-500">
                      <BsAlarm />
                    </div>
                    <div>
                      <div className="text-gray-500 font-semibold">Late</div>
                      <div>90%</div>
                    </div>
                  </div>
                </div>
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
                      highlightScope: { faded: "global", highlighted: "item" },
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
        </>
      )}
    </div>
  );
}
