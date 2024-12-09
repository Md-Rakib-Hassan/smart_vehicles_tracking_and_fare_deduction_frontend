import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import DatePicker from "react-datepicker";
const BusWithRoute = ({
  RouteTime,
  handleDeleteRoute,
  busDate,
  setBusDate,
  handlePublish,
  handleLoad
}) => {
  const [routeDate, setRouteDate] = useState({});
  const formateTime = (time) => {
    const hrmin = time.split(":");
    const hr = parseInt(hrmin[0]);
    if (hr > 12) {
      const newhr = hr % 12;
      return `${newhr}:${hrmin[1]} PM`;
    }
    return `${time} AM`;
  };
  const route = {};
  const formatedDate = (dateObj) => {
    const day = dateObj?.getDate();
    const month = dateObj?.getMonth();
    const year = dateObj?.getFullYear();
    return `${day}-${month + 1}-${year}`;
  };

  return (
    <div className="p-6 backdrop-blur-md bg-gray-600 bg-opacity-10 rounded-xl shadow-2xl border border-white border-opacity-20 overflow-y-auto h-96">
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">
        Bus with Route
      </h2>
      <div className="flex items-center space-x-2 mb-3">
        {/* Date Picker */}
        <DatePicker
          selected={busDate?.obj}
          onChange={(date) => setBusDate({obj:date,str:formatedDate(date)})}
          className="px-3 py-2 h-10 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholderText="Select Date"
        />
        <button
          onClick={handleLoad}
          className="px-3 py-2 h-10 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
        >
          Load
        </button>
      </div>
      <ul className="space-y-2 text-gray-100">
        {RouteTime?.map((route, index) => (
          <li
            key={index}
            className="backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-2 shadow-md flex items-center justify-between"
          >
            <div>
              <p>{route?.bus}</p>
              <p>
                {route?.from} - {route?.to}
              </p>
              <p className="text-sm text-gray-400">
                {route?.driver} - {formateTime(route?.time)}
              </p>
              {/* <p className="text-sm text-gray-400">{route?.driver} - {formatedDate(route?.date)}  { formateTime(route?.time)}</p> */}
            </div>
            <FaTrash
              onClick={() => handleDeleteRoute(route)}
              className="text-red-500 cursor-pointer"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={handlePublish}
        className="px-3 py-2 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 w-full mt-3"
      >
        Publish Schedule
      </button>
    </div>
  );
};

export default BusWithRoute;
