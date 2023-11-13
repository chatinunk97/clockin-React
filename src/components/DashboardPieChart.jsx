import { useEffect } from "react";
import Chart from "chart.js/auto";

export default function DashboardPieChart({ chartData }) {
  useEffect(() => {
    console.log(chartData);
    const data = {
      labels: [chartData[0].label, chartData[1].label], // Remove className attribute
      datasets: [
        {
          label: [...chartData],
          data: [...chartData],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, config);

    // Cleanup when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <canvas
      id="myChart"
      // style={{ width: "300px !important", height: "200px !important" }}
    ></canvas>
  );
}
// import { PieChart } from "@mui/x-charts/PieChart";

// export default function DashboardPieChart({ chartData }) {
//   return (
//     <div>
//       <PieChart
//         series={[
//           {
//             data: chartData,
//             highlightScope: {
//               faded: "global",
//               highlighted: "item",
//             },
//             faded: {
//               innerRadius: 30,
//               additionalRadius: -30,
//               outerRadius: 100, // Set the appropriate numeric value
//               color: "gray",
//             },
//           },
//         ]}
//         height={200}
//         width={405}
//       />
//     </div>
//   );
// }
