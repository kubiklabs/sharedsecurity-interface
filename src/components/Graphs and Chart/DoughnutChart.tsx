import React from 'react';
import { Pie } from 'react-chartjs-2';
// import 'chartjs-plugin-labels';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import 'chartjs-plugin-labels'
// import  'chartjs-plugin-piechart-outlabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

type DoughnutChartProps = {
  data: {
    labels: string[];
    datasets: number[];
  };
};

const DoughnutChart = ({ data }: DoughnutChartProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

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
    layout: { padding: 10 },
    plugins: {
      aspectRatio: 1,
      legend: {
        display: false
      },
      outlabels: {
        text: '%l %p',
        color: 'white',
        stretch: 45,
        font: {
            resizable: true,
            minSize: 12,
            maxSize: 18
        }
    }
      // outerLabels: {
      //   fontNormalSize: 14,
      //   fontNormalColor: '#565d64',
      //   fontBoldSize: 14,
      //   fontBoldColor: '#2e2e2e',
      //   // debug: true,
      // },
      // labels: {
      //   render: 'label',
      //   arc: true,
      //   fontColor: '#000',
      //   position: 'outside'
      // },
      // datalabels: {
      //   display: true,
      //   color: "white"
        
      // }
  
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default DoughnutChart;
