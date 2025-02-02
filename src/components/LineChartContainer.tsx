import { LineChart } from "@mui/x-charts/LineChart";
import { grey } from "@mui/material/colors";

export default function LineChartContainer() {
  return (
    <div className="col-span-9">
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 5, 8, 10],
            sx: {
              ".MuiChartsAxis-tickLabel": { fill: grey[100] },
              ".MuiChartsAxis-line": { stroke: grey[100] },
            },
          },
        ]}
        yAxis={[
          {
            sx: {
              ".MuiChartsAxis-tickLabel": { fill: grey[100] },
              ".MuiChartsAxis-line": { stroke: grey[100] },
            },
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: false,
            color: grey[100],
          },
        ]}
        sx={{
          backgroundColor: "transparent",
          "& .MuiChartsBackground-root": { fill: "transparent" },
          "& .MuiChartsLegend-root": { color: grey[100] },
        }}
      />
    </div>
  );
}
