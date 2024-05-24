// TemperatureChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions, ChartData } from "chart.js";
import "chartjs-adapter-date-fns";
import { TemperatureChartProps, GeneralData } from "../types/types"; // Asegúrate de importar los tipos correctos

const LinePlotLastDayTemperature: React.FC<TemperatureChartProps> = ({
  data,
}) => {
  const chartData: ChartData<"line", { x: Date; y: number }[], Date> = {
    labels: data.map((item: GeneralData) => new Date(item.timestamp)),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map((item: GeneralData) => ({
          x: new Date(item.timestamp),
          y: item.temperature ?? 0,
        })),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        beginAtZero: false, // Para la temperatura, es posible que no quieras comenzar en cero.
        title: {
          display: true,
          text: "Temperatura (°C)",
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
        text: "Niveles de Temperatura durante el último día",
        font: {
          size: 16,
        },
        color: "#333",
        padding: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Line style={{ height: "500px" }} data={chartData} options={options} />
  );
};

export default LinePlotLastDayTemperature;
