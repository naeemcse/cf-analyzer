'use client';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
const ResultView = () => {
    const [handle, setHandle] = useState('');
    const [result, setResult] = useState(null);

    const fetchStats = async () => {
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.status?handle=${handle}`
            );

            if (response.data.status === 'OK') {
                const submissions = response.data.result;
                const solvedByLanguage = {};
                const uniqueProblems = new Set();

                submissions.forEach((submission) => {
                    if (submission.verdict === 'OK') {
                        const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
                        if (!uniqueProblems.has(problemId)) {
                            uniqueProblems.add(problemId);
                            const language = submission.programmingLanguage;
                            solvedByLanguage[language] =
                                (solvedByLanguage[language] || 0) + 1;
                        }
                    }
                });

                setResult(solvedByLanguage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div style={{padding: '20px', fontFamily: 'Arial'}}>
            <h1>Codeforces Problem Stats</h1>
            <input
                className="border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                placeholder="Enter Codeforces Handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                style={{padding: '10px', fontSize: '16px'}}
            />
            <button className="bg-blue-500  border rounded-md hover:text-red-600 hover:bg-blue-50 " onClick={fetchStats}
                    style={{marginLeft: '10px', padding: '10px', fontSize: '16px'}}>
                Get Information
            </button>
           <h1>
               {result && `Statistics for ${handle}`}
           </h1>
            {result && (
            <div className="grid gap-2 grid-cols-2 border-2 p-3 mt-2 text-center">
                <div>Programming Languages:</div>
                <div>Solved Problems</div>
                {Object.entries(result).map(([language, count]) => (
                    <React.Fragment key={language}>
                        <div className="border-2">{language}</div>
                        <div className="border-2">{count} problems</div>
                    </React.Fragment>
                ))}
            </div>
            )}
        </div>
    );
};

export default ResultView;