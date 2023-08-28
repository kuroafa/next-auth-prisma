import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-plugin-style";

type Props = {};

const ClosingsChart = (props: Props) => {
  const data = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "Closings each month",
        data: [1, 5, 6, 5, 1, 6],
        backgroundColor: "green",
        borderColor: "black",
        tension: 0.4,
        borderWidth: 2,
        outerGlowColor: "yellow",
        outerGlowWidth: 20,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    backgroundColor: "#fff",

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#dbdbdb",
        },
        border: {},
        ticks: {
          display: false,
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <div className="h-[210px] overflow-hidden ">
      <Line  data={data} options={options} />
    </div>
  );
};

export default ClosingsChart;
