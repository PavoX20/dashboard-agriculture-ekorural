// TemperatureChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions, ChartData } from "chart.js";
import "chartjs-adapter-date-fns";
import { TemperatureChartProps, GeneralData } from "../types/types";

const LinePlotLastDayTemperature: React.FC<TemperatureChartProps> = ({
  data,
  theme // Asegúrate de recibir 'theme' como prop.
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
        borderColor: theme ? "rgba(255, 255, 255, 0.87)" : "rgb(255, 99, 132)",
        backgroundColor: theme ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 99, 132, 0.5)",
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
          color: theme ? "white" : "#333", // Cambiar color según el tema
        },
        ticks: {
          color: theme ? "white" : "#333",
        },
        grid: {
          color: theme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Temperatura (°C)",
          color: theme ? "white" : "#333", // Cambiar color según el tema
        },
        ticks: {
          color: theme ? "white" : "#333",
        },
        grid: {
          color: theme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: theme ? "white" : "#333", // Cambiar color de las etiquetas según el tema
        },
      },
      title: {
        display: true,
        text: "Niveles de Temperatura durante el último día",
        font: {
          size: 16,
        },
        color: theme ? "white" : "#333", // Cambiar color del título según el tema
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