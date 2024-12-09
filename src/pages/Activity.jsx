import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';

const Activity = () => {
    const [activityData, setActivityData] = useState([]);
    const axios = useAxios();

    useEffect(() => {
        axios.post('/activity', { id: localStorage.getItem('id') })
            .then(res=> setActivityData(res.data));
      
  })

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (time) => new Date(time).toLocaleTimeString();

  return (
    <div className="flex justify-center mx-auto min-h-screen">
      <div className="glassmorphism-container p-8 rounded-lg shadow-lg w-full ">
        <h2 className="text-center text-2xl font-semibold text-white mb-4">Activity Log</h2>
        <table className="table-auto w-full text-white">
          <thead>
            <tr className="text-lg">
              <th className="px-4 py-2 border-b border-gray-200/20">Journey Date</th>
              <th className="px-4 py-2 border-b border-gray-200/20">Start Time</th>
              <th className="px-4 py-2 border-b border-gray-200/20">Start Location</th>
              <th className="px-4 py-2 border-b border-gray-200/20">End Time</th>
              <th className="px-4 py-2 border-b border-gray-200/20">End Location</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((entry, index) => (
              <tr key={entry._id} className={`transition-colors duration-300 ${index % 2 === 0 ? 'bg-gray-500/20' : 'bg-gray-500/10'}`}>
                <td className="px-4 py-3 border-b border-gray-200/20">{formatDate(entry.start.timestamp)}</td>
                <td className="px-4 py-3 border-b border-gray-200/20">{formatTime(entry.start.timestamp)}</td>
                <td className="px-4 py-3 border-b border-gray-200/20">
                  {`${entry.start.geo.latitude},${entry.start.geo.longitude}`}
                </td>
                <td className="px-4 py-3 border-b border-gray-200/20">{formatTime(entry.end.timestamp)}</td>
                <td className="px-4 py-3 border-b border-gray-200/20">
                  {`${entry.end.geo.latitude},${entry.end.geo.longitude}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
