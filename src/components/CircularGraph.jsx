import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CircularGraph = ({ topicData }) => {
    if (!topicData || Object.keys(topicData).length === 0) {
        return <p className="text-center text-gray-500">No data available for topics.</p>;
    }

    const chartData = {
        labels: Object.keys(topicData),
        datasets: [
            {
                data: Object.values(topicData),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#FF5733', '#33FF57', '#5733FF', '#FFC300', '#DAF7A6', '#C70039',
                ],
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#FF5733', '#33FF57', '#5733FF', '#FFC300', '#DAF7A6', '#C70039',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'right' },
        },
    };

    return (
        <div className="p-5 bg-white shadow-md rounded-md w-full md:w-1/2 md:h-[500px] overflow-x-auto " >
            <h3 className="text-center text-lg font-bold mb-4">Problems Solved by Topic</h3>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default CircularGraph;
