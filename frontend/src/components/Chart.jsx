import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

function ChartT() {
  const [chartRendered, setChartRendered] = useState(false);
  const chartRef = React.useRef(null);

  useEffect(() => {
    const getChartOptions = () => {
      return {
        series: [90, 85, 70, 50],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#FB977DD9"],
        chart: {
          height: "380px",
          width: "100%",
          type: "radialBar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            track: {
              background: "#E5E7EB",
            },
            dataLabels: {
              show: false,
            },
            hollow: {
              margin: 0,
              size: "32%",
            },
          },
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -23,
            bottom: -20,
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
          labels: {
            formatter: function (value) {
              return value + "%";
            },
          },
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

  return (
    <div
      className="bg-white dark:bg-gray-700 p-3 rounded-lg"
      ref={chartRef}
    ></div>
  );
}

export default ChartT;
