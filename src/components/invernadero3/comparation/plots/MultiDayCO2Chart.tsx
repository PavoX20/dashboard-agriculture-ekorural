import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { ChartOptions, ChartData, TooltipItem } from 'chart.js';
import { MdHeight } from 'react-icons/md';

interface DataPoint {
  timestamp: string;
  humidity: number;
  temperature: number;
  co2: number;
}

interface DailyData {
  date: string;
  data: DataPoint[];
}

interface MultiDayCO2ChartProps {
  data: DailyData[];
  title: string;
  theme: 'dark' | 'light';
}

const getColor = (index: number) => {
  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
  ];
  return colors[index % colors.length];
};

const MultiDayCO2Chart: React.FC<MultiDayCO2ChartProps> = ({ data, title, theme }) => {
  const datasets = data.map((dayData, index) => ({
    label: dayData.date,
    data: dayData.data.map(item => ({
      x: new Date(item.timestamp).getHours() + new Date(item.timestamp).getMinutes() / 60, // Use hour and minute only
      y: item.co2,
    })),
    fill: false,
    borderColor: getColor(index),
    backgroundColor: getColor(index),
  }));

  const chartData: ChartData<'line', { x: number; y: number }[], number> = {
    datasets,
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Hora del día',
        },
        ticks: {
          callback: function(value) {
            const hours = Math.floor(value as number);
            const minutes = Math.floor(((value as number) - hours) * 60);
            return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
          }
        },
        grid: {
          color: theme === 'dark' ? '#777' : '#ccc',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'CO2 (ppm)',
        },
        grid: {
          color: theme === 'dark' ? '#777' : '#ccc',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
        color: theme === 'dark' ? '#fff' : '#333',
        padding: 20,
      },
      tooltip: {
        callbacks: {
          title: function(context: TooltipItem<'line'>[]) {
            const value = context[0].raw as { x: number; y: number };
            return `CO2: ${value.y} ppm`;
          },
          label: function(context: TooltipItem<'line'>) {
            const value = context.raw as { x: number; y: number };
            const hours = Math.floor(value.x);
            const minutes = Math.floor((value.x - hours) * 60);
            const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
            return `Hora: ${timeString}`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  const chartStyles = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#000',
  };

  return <Line style={chartStyles} data={chartData} options={options} />;
};

export default MultiDayCO2Chart;