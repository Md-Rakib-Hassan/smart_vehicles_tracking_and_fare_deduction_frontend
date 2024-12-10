import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import DatePicker from "react-datepicker";
import formatedDate from '../utils/formatedDate';
const BusSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [selectedDate,setSelectedDate]=useState({});
    const axios = useAxios();
    useEffect(() => {
        axios.get(`/get-bus-schedules/${selectedDate.str}`)
            .then(res => setSchedules(res?.data?.allRoutes))
        console.log(schedules);
    }, [axios,selectedDate]);
    return (
        <div className="p-8 text-white mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">All schedule</h2>
            <DatePicker
          selected={selectedDate?.obj}
          onChange={(date) => setSelectedDate({obj:date,str:formatedDate(date)})}
          className="px-3 py-2 h-10 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
          placeholderText="Select Date"
        />
            <div className="overflow-x-auto rounded-lg shadow-lg max-h-[80vh]">
                <table className="min-w-full bg-gray-600/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-white/10 backdrop-blur-md">
                        <tr>
                            <th className="px-6 py-4 text-left">No</th>
                            <th className="px-6 py-4 text-left">Bus</th>
                            <th className="px-6 py-4 text-left">From</th>
                            <th className="px-6 py-4 text-left">To</th>
                            <th className="px-6 py-4 text-left">Driver</th>
                            <th className="px-6 py-4 text-left">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules && schedules.length > 0 ? (
                            schedules.map((schedule, index) => (
                                <tr key={schedule._id} className="hover:bg-white/20">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{schedule.bus || ''}</td>
                                    <td className="px-6 py-4">{schedule.from || ''}</td>
                                    <td className="px-6 py-4">{schedule.to || ''}</td>
                                    <td className="px-6 py-4">{schedule.driver || ''}</td>
                                    <td className="px-6 py-4">{schedule.time || ''}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center">
                                    No schedule found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusSchedules;
