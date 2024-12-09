import React from 'react';

const AllRoutes = ({ allRoutes }) => {
    // Convert the routeCounts object to an array of { name, frequency } objects
    const routesArray = Object.entries(allRoutes).map(([routeName, frequency]) => ({
        name: routeName,
        frequency,
    }));
  console.log(routesArray);
  console.log("Child allRoutes prop:", allRoutes);

    return (
        <div className="p-6 backdrop-blur-md bg-gray-600 bg-opacity-10 rounded-xl shadow-2xl border border-white border-opacity-20 overflow-y-auto h-96">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">All Routes</h2>
            <ul className="space-y-2 text-gray-100">
                {routesArray.map((route, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-2 shadow-md"
                    >
                        {route.name}{' '}
                        <span className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            {route.frequency}
                        </span>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

export default AllRoutes;
