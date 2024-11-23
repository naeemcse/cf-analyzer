'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RatingGraph from './RatingGraph';
import CircularGraph from './CircularGraph';
import StatsTable from './StatsTable';

const FetchHandleData = ({ handle }) => {
    const [ratingData, setRatingData] = useState({});
    const [topicData, setTopicData] = useState({});
    const [stats, setStats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
                if (response.data.status === 'OK') {
                    const submissions = response.data.result;

                    // Process rating data
                    const ratings = {};
                    // Process topic data
                    const topics = {};
                    const problemAttempts = {};

                    submissions.forEach((submission) => {
                        const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
                        problemAttempts[problemKey] = (problemAttempts[problemKey] || 0) + 1;

                        if (submission.verdict === 'OK') {
                            // Count problem ratings
                            if (submission.problem.rating) {
                                const rating = submission.problem.rating;
                                ratings[rating] = (ratings[rating] || 0) + 1;
                            }

                            // Count problem topics
                            if (submission.problem.tags && submission.problem.tags.length > 0) {
                                submission.problem.tags.forEach((tag) => {
                                    topics[tag] = (topics[tag] || 0) + 1;
                                });
                            }
                        }
                    });

                    // Calculate statistics
                    const totalTried = Object.keys(problemAttempts).length;
                    const totalSolved = Object.values(problemAttempts).filter((count) => count === 1).length;
                    const averageAttempts = (
                        Object.values(problemAttempts).reduce((sum, count) => sum + count, 0) / totalTried
                    ).toFixed(2);
                    const maxAttempts = Math.max(...Object.values(problemAttempts));
                    const maxAttemptsProblem = Object.entries(problemAttempts).find(
                        ([, count]) => count === maxAttempts
                    );
                    const solvedWithOneSubmission = Object.values(problemAttempts).filter((count) => count === 1).length;
                    const solvedWithOneSubmissionPercentage = ((solvedWithOneSubmission / totalSolved) * 100).toFixed(2);

                    const calculatedStats = [
                        { metric: 'Tried', value: totalTried },
                        { metric: 'Solved', value: totalSolved },
                        { metric: 'Average attempts', value: averageAttempts },
                        { metric: 'Max attempts', value: `${maxAttempts} (${maxAttemptsProblem[0]})` },
                        {
                            metric: 'Solved with one submission',
                            value: `${solvedWithOneSubmission} (${solvedWithOneSubmissionPercentage}%)`,
                        },
                    ];

                    setRatingData(ratings);
                    setTopicData(topics);
                    setStats(calculatedStats);
                }
            } catch (err) {
                setError('Failed to fetch data. Please check the handle.');
                console.error(err);
            }
        };

        if (handle) fetchData();
    }, [handle]);

    return (
        <div className="w-full p-4 bg-gray-50 rounded-md shadow-md">
            {error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                        <RatingGraph ratingData={ratingData} />
                        <CircularGraph topicData={topicData} />
                    </div>
                    <div className="mt-4">
                        <StatsTable stats={stats} />
                    </div>
                </>
            )}
        </div>
    );
};

export default FetchHandleData;
