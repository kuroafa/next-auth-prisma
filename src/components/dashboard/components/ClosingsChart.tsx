import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-plugin-style";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Client } from "@prisma/client";

type Props = {
  chartData: Pick<Client, "budget">[];
};

const ClosingsChart = ({ chartData }: Props) => {
  const theme = useTheme();

  const formattedChartData = [];
  const newData = chartData.map((item) => {
    const newBudget = item.budget;
    formattedChartData.push(newBudget);
  });

  const data = {
    type: "line",
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "Client Budget",
        data: formattedChartData,
        backgroundColor: "white",
        borderColor: theme.theme === "light" ? "black" : "white",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 7,
        pointBackgroundColor: "#ffffff",
        pointBorderWidth: 2,
        pointBorderColor: "rgb(0, 0, 0)",
        pointStyle: "rectRot",
        order: 1,
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
      style: {
        glow: {
          color: theme.theme === "light" ? "black" : "white",
          width: 50, // Adjust the width of the glow
        },
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
        beginAtZero: true,
        min: 0,
        max: 1600000,
        ticks: {
          sampleSize: 10,
          stepSize: 20000,
          maxTicksLimit: 7,
        },
      },
    },
  };

  return (
    <Card className="flex-1  overflow-hidden">
      <CardHeader>
        <CardTitle>Budgets in Pipeline</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="h-[210px] overflow-hidden ">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClosingsChart;
