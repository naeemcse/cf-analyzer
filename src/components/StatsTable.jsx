import React from 'react';

const StatsTable = ({ stats }) => {
    return (
        <div className="max-w-lg mx-auto my-10 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                Performance Statistics
            </h2>
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-blue-200 text-gray-700">
                    <th className="border px-4 py-2 text-left">Metric</th>
                    <th className="border px-4 py-2 text-center">Value</th>
                </tr>
                </thead>
                <tbody>
                {stats.map((stat, index) => (
                    <tr
                        key={index}
                        className={`${
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } text-gray-800 hover:bg-blue-100`}
                    >
                        <td className="border px-4 py-2">{stat.metric}</td>
                        <td className="border px-4 py-2 text-center">
                            {stat.value}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StatsTable;
