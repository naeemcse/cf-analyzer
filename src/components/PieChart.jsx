
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ solvedByLanguage, wrongByLanguage }) => {
    const chartData = {
        labels: Object.keys(solvedByLanguage),
        datasets: [
            {
                data: Object.keys(solvedByLanguage).map((language) => solvedByLanguage[language]),
                backgroundColor: Object.keys(solvedByLanguage).map(() => 'rgba(75, 192, 192, 0.6)'), // Light Green
                hoverBackgroundColor: Object.keys(solvedByLanguage).map(() => 'rgba(75, 192, 192, 0.8)'),
                label: 'Accepted Problems',
            },
            {
                data: Object.keys(solvedByLanguage).map((language) => wrongByLanguage[language] || 0),
                backgroundColor: Object.keys(solvedByLanguage).map(() => 'rgba(255, 99, 132, 0.6)'), // Light Red
                hoverBackgroundColor: Object.keys(solvedByLanguage).map(() => 'rgba(255, 99, 132, 0.8)'),
                label: 'Wrong Answers',
            },
        ],
    };

    return (
        <div className="w-full bg-gray-50 rounded-md shadow-md p-4">
            <h2 className="text-center font-semibold">Programming Language Statistics (Pie Chart)</h2>
            <div className="chart">
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default PieChart;
