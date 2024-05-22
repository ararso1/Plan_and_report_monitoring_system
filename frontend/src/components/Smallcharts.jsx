import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";

function Smallcharts() {
  const [chartRendered, setChartRendered] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const getChartOptions = () => {
      return {
        series: [90, 50, 40, 50],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#FB977DD9"],
        chart: {
          height: "200px",
          width: "200px",
          type: "donut",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: "90%", // Adjust the thickness of the donut chart
              labels: {},
            },
          },
        },
        labels: ["በሂደት ላይ", "የተዘዋወረ", "ዝግ", "ያልተወሰነ"],
        legend: {
          show: true,
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        tooltip: {
          enabled: true,
          x: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      };
    };

    if (chartRef.current && !chartRendered) {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();
      setChartRendered(true);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      className="bg-white dark:bg-gray-700 p-3 rounded-lg"
      ref={chartRef}
    ></div>
  );
}

export default Smallcharts;
