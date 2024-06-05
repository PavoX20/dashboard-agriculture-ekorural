import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions, ChartData } from "chart.js";
import "chartjs-adapter-date-fns";
import { HumidityChartProps,GeneralData } from "../types/types";

const LinePlotLastDayHumedity: React.FC<HumidityChartProps> = ({ data }) => {
  const chartData: ChartData<"line", { x: Date; y: number }[], Date> = {
    labels: data.map((item: GeneralData) => new Date(item.timestamp)),
    datasets: [
      {
        label: "Humedad (%)",
        data: data.map((item) => ({
          x: new Date(item.timestamp),
          y: item.humidity,
        })),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        title: {
          display: true,
          text: "Hora del día",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Humedad (%)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as "top", // Usando un tipo literal
      },
      title: {
        display: true,
        text: 'Niveles de Humedad durante el último día',
        font: {
          size: 16
        },
        color: '#333',
        padding: 20
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    
      <Line style={{ height: '500px' }} data={chartData} options={options} />
    
  );
};

export default LinePlotLastDayHumedity;
