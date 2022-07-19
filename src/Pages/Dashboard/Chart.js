import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Chart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Bar Chart',
      // },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Active Users',
        data: [10, 30, 25, 40, 25, 30],
        backgroundColor: '#305CA1',
      },
      {
        label: 'Accessed Course',
        data: [20, 35, 10, 60, 30, 20],
        backgroundColor: '#F47522',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}

export default Chart;
