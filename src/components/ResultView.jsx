'use client';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Image  from "next/image";
import FetchHandleData from "@/components/FetchHandleData";
const ResultView = () => {
    const [inputValue, setInputValue] = useState('');
    const [handle, setHandle] = useState('');
    const [result, setResult] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Find Unique Problems
/*
    const fetchStats = async () => {
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.status?handle=${handle}`
            );

            if (response.data.status === 'OK') {
                const submissions = response.data.result;
                const solvedByLanguage = {};
                const wrongByLanguage = {};
                const uniqueProblems = new Set();

                submissions.forEach((submission) => {
                    const language = submission.programmingLanguage;
                    const problemId = `${submission.problem.contestId}-${submission.problem.index}`;

                    if (submission.verdict === 'OK') {
                        if (!uniqueProblems.has(problemId)) {
                            uniqueProblems.add(problemId);
                            solvedByLanguage[language] = (solvedByLanguage[language] || 0) + 1;
                        }
                    } else if (submission.verdict === 'WRONG_ANSWER') {
                        wrongByLanguage[language] = (wrongByLanguage[language] || 0) + 1;
                    }
                });

                setResult({ solvedByLanguage, wrongByLanguage });
            }

            const userInfoResponse = await axios.get(
                `https://codeforces.com/api/user.info?handles=${handle}`
            );

            if (userInfoResponse.data.status === 'OK') {
                setUserInfo(userInfoResponse.data.result[0]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
*/

    // Find all problems unique dosent matter if solved or not
 /*

 const fetchStats = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.status?handle=${handle}`
            );

            if (response.data.status === 'OK') {
                const submissions = response.data.result;
                const solvedByLanguage = {};
                const wrongByLanguage = {};
                const uniqueProblems = new Set();

                submissions.forEach((submission) => {
                    const language = submission.programmingLanguage;
                    const problemId = `${submission.problem.contestId}-${submission.problem.index}`;

                    uniqueProblems.add(problemId);

                    if (submission.verdict === 'OK') {
                        solvedByLanguage[language] = (solvedByLanguage[language] || 0) + 1;
                    } else if (submission.verdict === 'WRONG_ANSWER') {
                        wrongByLanguage[language] = (wrongByLanguage[language] || 0) + 1;
                    }
                });

                setResult({ solvedByLanguage, wrongByLanguage, uniqueProblems: uniqueProblems.size });
            }

            const userInfoResponse = await axios.get(
                `https://codeforces.com/api/user.info?handles=${handle}`
            );

            if (userInfoResponse.data.status === 'OK') {
                setUserInfo(userInfoResponse.data.result[0]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    */

   // Find unique problems and unique in language.

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.status?handle=${handle}`
            );

            if (response.data.status === 'OK') {
                const submissions = response.data.result;
                const solvedByLanguage = {};
                const wrongByLanguage = {};
                const uniqueProblems = new Set();
                const allProblems = new Set();
                const uniqueProblemsByLanguage = {};

                submissions.forEach((submission) => {
                    const language = submission.programmingLanguage;
                    const problemId = `${submission.problem.contestId}-${submission.problem.index}`;

                    allProblems.add(problemId);

                    if (!uniqueProblemsByLanguage[language]) {
                        uniqueProblemsByLanguage[language] = new Set();
                    }

                    if (submission.verdict === 'OK') {
                        solvedByLanguage[language] = (solvedByLanguage[language] || 0) + 1;
                        if (!uniqueProblemsByLanguage[language].has(problemId)) {
                            uniqueProblemsByLanguage[language].add(problemId);
                        }
                        uniqueProblems.add(problemId);
                    } else if (submission.verdict === 'WRONG_ANSWER') {
                        wrongByLanguage[language] = (wrongByLanguage[language] || 0) + 1;
                    }
                });

                setResult({
                    solvedByLanguage,
                    wrongByLanguage,
                    uniqueProblems: uniqueProblems.size,
                    allProblems: allProblems.size,
                    uniqueProblemsByLanguage: Object.fromEntries(
                        Object.entries(uniqueProblemsByLanguage).map(([lang, problems]) => [lang, problems.size])
                    ) // Convert Sets to their sizes
                });
            }

            const userInfoResponse = await axios.get(
                `https://codeforces.com/api/user.info?handles=${handle}`
            );

            if (userInfoResponse.data.status === 'OK') {
                setUserInfo(userInfoResponse.data.result[0]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setHandle(inputValue);
        }
    };

    const handleButtonClick = () => {
        setHandle(inputValue);
    };

    useEffect(() => {
        if (handle) {
            fetchStats();
        }
    }, [handle]);

   // const totalSolved = result ? Object.values(result.solvedByLanguage).reduce((a, b) => a + b, 0) : 0;

    const chartData = result ? {
        labels: Object.keys(result.solvedByLanguage),
        datasets: [
            {
                label: 'Accepted',
                data: Object.values(result.solvedByLanguage),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Wrong Answers',
                data: Object.keys(result.solvedByLanguage).map(language => result.wrongByLanguage[language] || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    } : null;

    return (
        <div className="table-container">
            <div className="center-container">
                <h1 className={"text-gray-400 my-5"}> Write your codeforces handle and know details </h1>
                <input
                    className="m-2 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    type="text"
                    placeholder="Enter Codeforces Handle"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    style={{padding: '10px', fontSize: '16px'}}
                />
                <button
                    className="bg-blue-500 border rounded-md hover:text-red-600 hover:bg-blue-50"
                    onClick={handleButtonClick}
                    disabled={isLoading}
                    style={{marginLeft: '10px', padding: '10px', fontSize: '16px'}}
                >
                    {isLoading ? 'Loading...' : 'Get Information'}
                </button>

                {userInfo && (
                    <div className={"mx-auto flex flex-col justify-center"} style={{marginTop: '20px'}}>
                        <h2>User Information</h2>
                        <Image className={"mx-auto rounded-[50%] w-[100px] h-[100px]"} src={userInfo.avatar}
                               alt="User Avatar" width={100} height={100} title={userInfo.handle}/>
                        <p><strong>Handle:</strong> {userInfo.handle}</p>
                        {userInfo.firstName && userInfo.lastName && (
                            <p><strong> Name :</strong> {userInfo.firstName} {userInfo.lastName}</p>)}
                        <p><strong>Current Rating:</strong> {userInfo.rating}</p>
                        <p className={"text-red-600"}><strong>Max Rating:</strong> {userInfo.maxRating}</p>
                    </div>
                )}
            </div>
            {result && (
                <>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>Programming Languages</th>
                            <th>Accepted Problems</th>
                            <th>Unique Problems</th>
                            <th className={"text-red-600"}>Wrong Answers</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(result.solvedByLanguage).map((language) => (
                            <tr key={language}>
                                <td>{language}</td>
                                <td>{result.solvedByLanguage[language]} problems</td>
                                <td>{result.uniqueProblemsByLanguage[language] || 0} problems</td>
                                <td>{result.wrongByLanguage[language] || 0} problems</td>
                            </tr>
                        ))}
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>{Object.values(result.solvedByLanguage).reduce((a, b) => a + b, 0)} problems</strong></td>
                            <td><strong>{Object.values(result.uniqueProblemsByLanguage).reduce((a, b) => a + b, 0)} problems</strong></td>
                            <td><strong>{Object.values(result.wrongByLanguage).reduce((a, b) => a + b, 0)} problems</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Unique Problems</strong></td>
                            <td><strong>{result.uniqueProblems} problems</strong></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <div
                        className="w-full max-w-screen-2xl h-[500px] mx-auto bg-gray-50 rounded-md shadow-md chart-container m-2 p-4">

                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,  // Ensures chart is responsive
                                    maintainAspectRatio: false,  // Allows it to stretch and resize
                                    aspectRatio: 2,  // You can change aspectRatio to control the chart's shape
                                }}
                            />
                    </div>


                </>
            )}

            {
                result && (
                    <FetchHandleData handle={handle}/>
                )
            }
        </div>
    );
};

export default ResultView;