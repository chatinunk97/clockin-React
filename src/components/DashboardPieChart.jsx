import { useEffect } from "react";
import Chart from "chart.js/auto";
import LinearIndeterminate from "./LoadingBar";

export default function DashboardPieChart({ chartData, loading }) {
  useEffect(() => {
    const data = {
      labels: [chartData[0]?.title, chartData[1]?.title],
      datasets: [
        {
          label: [chartData.title],
          data: [chartData[0]?.count, chartData[1]?.count],
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

    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return (
    <>
      {loading && <LinearIndeterminate />}

      <canvas id="myChart"></canvas>
    </>
  );
}
