import React, { useState } from "react";
import { LuArmchair } from "react-icons/lu";
import { PiSteeringWheel } from "react-icons/pi";

const SeatComponent = ({ totalSeats = 40, bookedSeats }) => {
  const [seats] = useState(Array.from({ length: totalSeats }, (_, i) => i + 1));
  const availableCount = totalSeats - bookedSeats;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Bus Seat Layout</h1>
        <div className="flex justify-around w-full mt-2">
          <div className="text-md font-semibold text-white drop-shadow-lg">
            <span className="text-green-300">Available: </span>
            {availableCount}
          </div>
          <div className="text-md font-semibold text-white drop-shadow-lg">
            <span className="text-red-300">Booked: </span>
            {bookedSeats}
          </div>
        </div>
      </div>

      <div
        className="glass-effect grid grid-cols-5 gap-5 p-6 rounded-lg shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="col-span-3"></div>
        <div className="flex items-center justify-end col-span-2">
          <PiSteeringWheel className="text-5xl text-gray-300 drop-shadow-lg" />
        </div>

        {seats.map((seat, index) => (
          <React.Fragment key={seat}>
            {index % 4 === 2 && <div className="col-span-1"></div>}
            <div
              className={`seat glass-effect w-12 h-12 flex items-center justify-center rounded-lg font-bold ${
                index < bookedSeats ? "bg-red-300" : "bg-white"
              }`}
              style={{
                backdropFilter: "blur(6px)",
                backgroundColor: index < bookedSeats ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <LuArmchair className="text-xl text-white drop-shadow-lg" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SeatComponent;
