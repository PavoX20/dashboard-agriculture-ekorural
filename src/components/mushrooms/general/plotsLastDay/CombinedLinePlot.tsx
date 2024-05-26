import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartOptions, ChartData } from "chart.js";
import "chartjs-adapter-date-fns";
import { CombinedChartProps, GeneralData } from "../types/types";

const CombinedLinePlot: React.FC<CombinedChartProps> = ({ data, theme, tempThreshold, humidityThreshold, co2Threshold, title }) => {
  const tempPointColor = data.map(item => (item.temperature ?? 0) < tempThreshold ? 'rgb(255, 0, 0)' : 'rgb(60, 186, 159)');
  const humidityPointColor = data.map(item => (item.humidity ?? 0) < humidityThreshold ? 'rgb(255, 0, 0)' : 'rgb(255, 205, 86)');
  const co2PointColor = data.map(item => (item.co2 ?? 0) < co2Threshold ? 'rgb(255, 0, 0)' : 'rgb(54, 162, 235)');

  const chartData: ChartData<"line", { x: Date; y: number }[], Date> = {
    labels: data.map((item: GeneralData) => new Date(item.timestamp)),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map(item => ({
          x: new Date(item.timestamp),
          y: item.temperature ?? 0,
        })),
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: tempPointColor,
        pointBorderColor: tempPointColor,
        pointHoverRadius: 5,
        segment: {
          borderColor: ctx => ctx.p1.parsed.y < tempThreshold ? 'rgb(255, 0, 0)' : 'rgb(60, 186, 159)',
          backgroundColor: ctx => ctx.p1.parsed.y < tempThreshold ? 'rgba(255, 0, 0, 0.5)' : 'rgba(60, 186, 159, 0.5)',
        },
        borderColor: 'rgb(60, 186, 159)', // Verde para temperatura en la leyenda
        backgroundColor: 'rgba(60, 186, 159, 0.5)', // Verde para el fondo de la leyenda
      },
      {
        label: "Humedad (%)",
        data: data.map(item => ({
          x: new Date(item.timestamp),
          y: item.humidity ?? 0,
        })),
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: humidityPointColor,
        pointBorderColor: humidityPointColor,
        pointHoverRadius: 5,
        segment: {
          borderColor: ctx => ctx.p1.parsed.y < humidityThreshold ? 'rgb(255, 0, 0)' : 'rgb(255, 205, 86)',
          backgroundColor: ctx => ctx.p1.parsed.y < humidityThreshold ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 205, 86, 0.5)',
        },
        borderColor: 'rgb(255, 205, 86)', // Amarillo para humedad en la leyenda
        backgroundColor: 'rgba(255, 205, 86, 0.5)', // Amarillo para el fondo de la leyenda
      },
      {
        label: "CO2 (ppm)",
        data: data.map(item => ({
          x: new Date(item.timestamp),
          y: item.co2 ?? 0,
        })),
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: co2PointColor,
        pointBorderColor: co2PointColor,
        pointHoverRadius: 5,
        segment: {
          borderColor: ctx => ctx.p1.parsed.y < co2Threshold ? 'rgb(255, 0, 0)' : 'rgb(54, 162, 235)',
          backgroundColor: ctx => ctx.p1.parsed.y < co2Threshold ? 'rgba(255, 0, 0, 0.5)' : 'rgba(54, 162, 235, 0.5)',
        },
        borderColor: 'rgb(54, 162, 235)', // Azul para CO2 en la leyenda
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Azul para el fondo de la leyenda
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
        },
        ticks: {
          color: theme ? "white" : "#333",
        },
        grid: {
          color: theme ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Valores",
          color: theme ? "white" : "#333",
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
          color: theme ? "white" : "#333",
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
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
