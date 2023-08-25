import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

type Props = {};

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ClosingsChart = (props: Props) => {
  const data = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        labels: "Closings each months",
        data: [6, 2, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColor: "aqua",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default ClosingsChart;
