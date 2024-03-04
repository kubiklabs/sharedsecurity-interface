import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

type DoughnutChartProps = {
  data: {
    labels: string[];
    datasets: number[];
  };
};

const DoughnutChart= ({ data }:DoughnutChartProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Calculate different shades of pink
  const baseColor = [252, 108, 159, 1];
  const backgroundColors = data.labels.map((label, index) => {
    const ratio = index / data.labels.length;
    const color = baseColor.map((channel) => Math.round(channel - ratio * channel));
    return `rgb(${color.join(',')})`;
  });

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Total Supply',
        data: data.datasets,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    aspectRatio: 1, // Adjust the aspect ratio as needed
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#fff',
        formatter: (value: any, context: any) => {
          return data.labels[context.dataIndex];
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
