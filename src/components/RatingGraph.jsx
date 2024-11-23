'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const RatingGraph = ({ ratingData }) => {
    const chartData = {
        labels: Object.keys(ratingData),
        datasets: [
            {
                label: 'Problems Solved',
                data: Object.values(ratingData),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' },
        },
        scales: {
            x: { title: { display: true, text: 'Rating Ranges' } },
            y: { title: { display: true, text: 'Number of Problems Solved' } },
        },
    };

    return (
        <div className={"w-full md:w-1/2 "}>
        <div className="p-5 bg-white shadow-md rounded-md md:h-[500px] mx-auto" >
            <h3 className="text-center text-lg font-bold mb-4">Problems Solved by Rating</h3>
            <Bar data={chartData} options={options} />
        </div>
        </div>
    );
};

export default RatingGraph;
