import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import useAxios from '../hooks/useAxios';
import ReactLoading from "react-loading";

const StudentDashboard = () => {
    const [traveled, setTraveled] = useState([]);
    const axios = useAxios();
  
  useEffect(() => {
      const id=localStorage('id');
    axios.post('/activity', { id: id })
      .then(res => {
        setTraveled(res.data)
              console.log(traveled);
            });
        
    }, [axios]);
    
    if (!traveled) {
      return (
        <div className="flex items-center justify-center h-screen w-full">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#1189ff"}
            height={"7%"}
            width={"7%"}
          />
        </div>
      );
    }
  
  
  
    
  const travelData = {
    labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
    datasets: [
      {
        label: 'Travel Count',
        data: [15, 10, 25, 8, 20],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const balanceData = {
    labels: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
    datasets: [
      {
        label: 'Balance',
        data: [100, 250, 150, 200, 300],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="p-6  min-h-screen flex flex-col items-center">
      {/* Top Boxes */}
      <div className="w-full flex justify-around mb-6">
        <InfoBox title="Total Balance" value={travelData.length} />
        <InfoBox title="Total paid" value={traveled?.length*20} />
      </div>

      {/* Graphs Section */}
      <div className="w-full grid grid-cols-2 gap-4">
        <GraphBox title="User Travel Data" graphType="bar" data={travelData} />
        <GraphBox title="Top 5 Users by Balance" graphType="doughnut" data={balanceData} />
      </div>
    </div>
  );
};

// InfoBox Component for displaying counts
const InfoBox = ({ title, value }) => (
  <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg w-1/4 text-center">
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-2xl font-bold text-blue-200">{value}</p>
  </div>
);

// GraphBox Component for charts
const GraphBox = ({ title, graphType, data }) => (
  <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full h-80">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <div className="h-64">
      {graphType === 'bar' ? (
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      ) : (
        <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      )}
    </div>
  </div>
);

export default StudentDashboard;
