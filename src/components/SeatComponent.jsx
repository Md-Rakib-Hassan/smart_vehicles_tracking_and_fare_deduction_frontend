import React from "react";
import { useState } from "react";
import { LuArmchair } from "react-icons/lu"; // Updated to use LuArmchair icon
import { PiSteeringWheel } from "react-icons/pi";

const SeatComponent = ({ totalSeats = 40, bookedSeats }) => {
  const [seats] = useState(Array.from({ length: totalSeats }, (_, i) => i + 1));
  const availableCount = totalSeats - bookedSeats;

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 bg-">
        <h1 className="text-3xl font-bold text-blue-600">Bus Seat Layout</h1>
        <div className="flex justify-around w-full mt-2 mb-8">
          <div className="text-md font-semibold">
            <span className="text-green-600">Available: </span>
            {availableCount}
          </div>
          <div className="text-md font-semibold">
            <span className="text-red-600">Booked: </span>
            {bookedSeats}
          </div>
        </div>

              <div className="grid grid-cols-5 gap-5 ">
                  <div className="col-span-3"></div>
                  <div
                  className={`flex items-center justify-end  font-bold bg-transparent col-span-2`} // Use light red for booked and no color for available
                  ><PiSteeringWheel className="text-5xl text-gray-400" />
                  </div>
                  
                  
          {" "}
          {/* 5 columns grid with middle gap */}
          {seats.map((seat, index) => {
            return (
              <React.Fragment key={seat}>
                {index % 4 === 2 && <div className="col-span-1"></div>}{" "}
                {/* Adding the gap */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg font-bold border-2 border-gray-500 ${
                    index < bookedSeats ? "bg-red-200" : "bg-transparent"
                  }`} // Use light red for booked and no color for available
                >
                  <div className="relative">
                    <LuArmchair className="text-xl " />
                    {/* <span className="absolute -bottom-3 right-1 text-xs text-gray-800">
                      {seat}
                    </span>{" "} */}
                  </div>

                  {/* Seat number */}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeatComponent;
