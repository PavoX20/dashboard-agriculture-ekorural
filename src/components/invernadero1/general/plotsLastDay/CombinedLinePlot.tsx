import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions, ChartData } from "chart.js";
import "chartjs-adapter-date-fns";
import { CombinedChartProps, GeneralData } from "../../../types/sharedTypes";

const CombinedLinePlot: React.FC<CombinedChartProps> = ({
  data,
  theme,
  tempThreshold,
  humidityThreshold,
  title,
}) => {
  const tempPointColor = data.map((item) =>
    (item.temperature ?? 0) < tempThreshold
      ? "rgb(255, 0, 0)"
      : "rgb(255, 205, 86)"
  ); // Amarillo para temperatura
  const humidityPointColor = data.map((item) =>
    (item.humidity ?? 0) < humidityThreshold
      ? "rgb(255, 0, 0)"
      : "rgb(54, 162, 235)"
  ); // Azul para humedad

  const chartData: ChartData<"line", { x: Date; y: number }[], Date> = {
    labels: data.map((item: GeneralData) => new Date(item.timestamp)),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map((item) => ({
          x: new Date(item.timestamp),
          y: item.temperature ?? 0,
        })),
        fill: false,
        yAxisID: "y-axis-temp-hum",
        pointRadius: 3,
        pointBackgroundColor: tempPointColor,
        pointBorderColor: tempPointColor,
        pointHoverRadius: 5,
        segment: {
          borderColor: (ctx) => {
            const previousValue = ctx.p0.parsed.y;
            const currentValue = ctx.p1.parsed.y;
            return previousValue < tempThreshold && currentValue < tempThreshold
              ? "rgb(255, 0, 0)"
              : "rgb(255, 205, 86)";
          },
          backgroundColor: (ctx) => {
            const previousValue = ctx.p0.parsed.y;
            const currentValue = ctx.p1.parsed.y;
            return previousValue < tempThreshold && currentValue < tempThreshold
              ? "rgba(255, 0, 0, 0.5)"
              : "rgba(255, 205, 86, 0.5)";
          },
        },
        borderColor: "rgb(255, 205, 86)", // Amarillo para temperatura en la leyenda
        backgroundColor: "rgba(255, 205, 86, 0.5)", // Amarillo para el fondo de la leyenda
      },
      {
        label: "Humedad (%)",
        data: data.map((item) => ({
          x: new Date(item.timestamp),
          y: item.humidity ?? 0,
        })),
        fill: false,
        yAxisID: "y-axis-temp-hum",
        pointRadius: 3,
        pointBackgroundColor: humidityPointColor,
        pointBorderColor: humidityPointColor,
        pointHoverRadius: 5,
        segment: {
          borderColor: (ctx) => {
            const previousValue = ctx.p0.parsed.y;
            const currentValue = ctx.p1.parsed.y;
            return previousValue < humidityThreshold &&
              currentValue < humidityThreshold
              ? "rgb(255, 0, 0)"
              : "rgb(54, 162, 235)";
          },
          backgroundColor: (ctx) => {
            const previousValue = ctx.p0.parsed.y;
            const currentValue = ctx.p1.parsed.y;
            return previousValue < humidityThreshold &&
              currentValue < humidityThreshold
              ? "rgba(255, 0, 0, 0.5)"
              : "rgba(54, 162, 235, 0.5)";
          },
        },
        borderColor: "rgb(54, 162, 235)", // Azul para humedad en la leyenda
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Azul para el fondo de la leyenda
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
          color: theme ? "white" : "#333",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: theme ? "white" : "#333",
          font: {
            size: 14,
          },
        },
        grid: {
          color: theme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      "y-axis-temp-hum": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Temperatura (°C) / Humedad (%)",
          color: theme ? "white" : "#333",
          font: {
            size: 16,
          },
        },
        ticks: {
          color: theme ? "white" : "#333",
          font: {
            size: 14,
          },
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
          color: theme ? "white" : "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
        color: theme ? "white" : "#333",
        padding: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Line style={{ height: "600px" }} data={chartData} options={options} />
  );
};

export default CombinedLinePlot;
