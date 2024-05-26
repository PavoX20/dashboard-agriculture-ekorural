import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartOptions, ChartData } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { CO2ChartProps, GeneralData } from '../types/types';

const LinePlotLastDayCO2: React.FC<CO2ChartProps> = ({ data, theme, threshold }) => {
  const pointColor = data.map(item => (item.co2 ?? 0) < threshold ? 'rgb(255, 0, 0)' : 'rgb(60, 186, 159)');

  const chartData: ChartData<'line', { x: Date; y: number }[], Date> = {
    labels: data.map((item: GeneralData) => new Date(item.timestamp)),
    datasets: [
      {
        label: 'CO2 (ppm)',
        data: data.map(item => ({
          x: new Date(item.timestamp),
          y: item.co2 ?? 0,
        })),
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: pointColor,
        pointBorderColor: pointColor,
        segment: {
          borderColor: ctx => ctx.p1.parsed.y < threshold ? 'rgb(255, 0, 0)' : 'rgb(60, 186, 159)',
          backgroundColor: ctx => ctx.p1.parsed.y < threshold ? 'rgba(255, 0, 0, 0.5)' : 'rgba(60, 186, 159, 0.5)',
        },
        pointHoverRadius: 5,
        borderColor: 'rgb(60, 186, 159)', // Cambia el color de la línea a verde
        backgroundColor: 'rgba(60, 186, 159, 0.5)', // Cambia el color de fondo a verde
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
          },
        },
        title: {
          display: true,
          text: 'Hora del día',
          color: theme ? 'white' : '#333',
        },
        ticks: {
          color: theme ? 'white' : '#333',
        },
        grid: {
          color: theme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'CO2 (ppm)',
          color: theme ? 'white' : '#333',
        },
        ticks: {
          color: theme ? 'white' : '#333',
        },
        grid: {
          color: theme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: theme ? 'white' : '#333',
        },
      },
      title: {
        display: true,
        text: 'Niveles de CO2 durante el último día',
        font: {
          size: 16,
        },
        color: theme ? 'white' : '#333',
        padding: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line style={{ height: '500px' }} data={chartData} options={options} />;
};

export default LinePlotLastDayCO2;
