'use client';
import React, { useState } from 'react';
import axios from 'axios';

const ResultView = () => {
    const [handle, setHandle] = useState('');
    const [result, setResult] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

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

    const totalSolved = result ? Object.values(result.solvedByLanguage).reduce((a, b) => a + b, 0) : 0;
    const totalLanguages = result ? Object.keys(result.solvedByLanguage).length : 0;

    return (
        <div className="table-container">
            <h1>Codeforces Problem Stats</h1>
            <input
                className="border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Enter Codeforces Handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                style={{ padding: '10px', fontSize: '16px' }}
            />
            <button
                className="bg-blue-500 border rounded-md hover:text-red-600 hover:bg-blue-50"
                onClick={fetchStats}
                style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}
            >
                Get Information
            </button>
            <h1>{result && `Statistics for ${handle}`}</h1>
            {result && (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Programming Languages</th>
                        <th>Solved Problems</th>
                        <th>Wrong Answers</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(result.solvedByLanguage).map((language) => (
                        <tr key={language}>
                            <td>{language}</td>
                            <td>{result.solvedByLanguage[language]} problems</td>
                            <td>{result.wrongByLanguage[language] || 0} problems</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{totalSolved} problems</strong></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            )}
            {userInfo && (
                <div style={{ marginTop: '20px' }}>
                    <h2>User Information</h2>
                    <p><strong>Handle:</strong> {userInfo.handle}</p>
                    <p><strong>Current Rating:</strong> {userInfo.rating}</p>
                    <p><strong>Max Rating:</strong> {userInfo.maxRating}</p>
                </div>
            )}
        </div>
    );
};

export default ResultView;