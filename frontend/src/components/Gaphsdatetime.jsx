import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";

function GraphsDateTime() {
  const [chartRendered, setChartRendered] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    const getChartOptions = () => {
      // Example data points for stock prices

      const dates = [
        [new Date("2024-01-01").getTime(), 1000000],
        [new Date("2024-02-01").getTime(), 1200000],
        [new Date("2024-03-01").getTime(), 800000],
        [new Date("2024-04-01").getTime(), 1500000],
        [new Date("2024-05-01").getTime(), 900000],
        [new Date("2024-06-01").getTime(), 1000000],
        [new Date("2024-07-01").getTime(), 1200000],
        [new Date("2024-08-01").getTime(), 800000],
        [new Date("2024-09-01").getTime(), 1500000],
        [new Date("2024-10-01").getTime(), 900000],
        [new Date("2024-11-01").getTime(), 10000],
        [new Date("2024-12-01").getTime(), 10000],
      ];

      return {
        series: [
          {
            name: "XYZ MOTORS",
            data: dates,
          },
        ],
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
        },
        title: {
          text: "የአመቱ ልዩነት",
          align: "left",
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },

        xaxis: {
          type: "datetime",

          min: new Date("2024-01-01").getTime(),
          max: new Date("2024-12-31").getTime(),
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return (val / 1000000).toFixed(0);
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

export default GraphsDateTime;
