import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';

const LinkWithRoute = ({ route, setRoute, availableBus, availableLocation, availableDriver, handleAddRoute }) => {
    return (
        <div className="p-6 backdrop-blur-md bg-gray-600 bg-opacity-10 rounded-xl shadow-2xl border border-white border-opacity-20 overflow-y-auto h-96">
        <h2 className="text-2xl font-semibold text-gray-200 mb-4">Link with Route</h2>
        <div className="flex flex-col space-y-3 text-black">
          <select className="px-3 py-2 rounded-lg text-black bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" value={route?.bus} onChange={(e) => setRoute({ ...route, bus: e.target.value })}>
            <option value="" disabled>Select Bus</option>
            {availableBus?.map((bus) => <option key={bus._id} className='text-black' value={bus.bus_name}>{bus?.bus_name}</option>)}
          </select>

          <select className="px-3 py-2 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" value={route.from} onChange={(e) => setRoute({ ...route, from: e.target.value })}>
            <option value="" disabled>Select From</option>
            {availableLocation?.filter((loc) => loc.location_name !== route.to).map((location) => <option className='text-black' key={location._id} value={location.location_name}>{location.location_name}</option>)}
          </select>

          <select className="px-3 py-2 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" value={route.to} onChange={(e) => setRoute({ ...route, to: e.target.value })}>
            <option value="" disabled>Select To</option>
            {availableLocation?.filter((loc) => loc.location_name !== route.from).map((location) => <option className='text-black' key={location._id} value={location.location_name}>{location.location_name}</option>)}
          </select>

          <select className="px-3 py-2 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" value={route.driver} onChange={(e) => setRoute({ ...route, driver: e.target.value })}>
            <option value="" disabled>Select Driver</option>
            {availableDriver?.map((driver) => <option className='text-black' key={driver._id} value={driver.name}>{driver.name}</option>)}
          </select>

          {/* Date Picker */}
          {/* <DatePicker
            selected={route?.date}
            onChange={(date) => setRoute({ ...route, date })}
            minDate={new Date()}
            className="px-3 py-2 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            placeholderText="Select Date"
          /> */}

          {/* Time Picker */}
          <TimePicker
            onChange={(time) => setRoute({ ...route, time })}
            value={route?.time}
            className="px-3 py-2 rounded-lg bg-white bg-opacity-20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            disableClock
          />

          <button onClick={()=>handleAddRoute(route)} className="px-3 py-2 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300">
            Add
          </button>
        </div>
      </div>
    );
};

export default LinkWithRoute;