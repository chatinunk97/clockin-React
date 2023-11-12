import { PieChart } from "@mui/x-charts/PieChart";

export default function DashboardPieChart({ chartData }) {
  return (
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
  );
}
