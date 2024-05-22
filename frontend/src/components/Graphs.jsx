import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

function Graphs() {
  const [chartRendered, setChartRendered] = useState(false);
  const chartRef = React.useRef(null);

  useEffect(() => {
    const getChartOptions = () => {
      return {
        series: [
          {
            name: "በሂደት ላይ ",
            data: [
              { x: 1, y: 20 },
              { x: 2, y: 35 },
              { x: 3, y: 45 },
              { x: 4, y: 30 },
              { x: 5, y: 55 },
            ],
          },
          {
            name: "የተዘዋወረ",
            data: [
              { x: 1, y: 40 },
              { x: 2, y: 15 },
              { x: 3, y: 25 },
              { x: 4, y: 50 },
              { x: 5, y: 35 },
            ],
          },
          {
            name: "ዝግ",
            data: [
              { x: 1, y: 10 },
              { x: 2, y: 25 },
              { x: 3, y: 35 },
              { x: 4, y: 20 },
              { x: 5, y: 45 },
            ],
          },
          {
            name: "ያልተወሰነ",
            data: [
              { x: 1, y: 30 },
              { x: 2, y: 45 },
              { x: 3, y: 55 },
              { x: 4, y: 40 },
              { x: 5, y: 65 },
            ],
          },
        ],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#FB977D"],
        chart: {
          height: "380px",
          width: "100%",
          type: "line",
          sparkline: {
            enabled: false,
          },
        },
        xaxis: {
          type: "numeric",
        },
      };
    };

    if (chartRef.current && !chartRendered) {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();
      setChartRendered(true);
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = ""; // Clear the chart container
      }
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return <div className="" ref={chartRef}></div>;
}

export default Graphs;
