import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBus, FaUserFriends, FaCog, FaTachometerAlt, FaAngleDoubleLeft, FaAngleDoubleRight, FaUserPlus, FaEye, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const userRole=localStorage.getItem('role');
  
  const logout = () => {
    localStorage.removeItem('id');
    navigate('/login');
  };

  return (
    <div
      className={`h-screen backdrop-blur-lg bg-white/5 text-gray-200 shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
      style={{
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">DIU_Connect</h1>}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
      </div>

      <nav className="flex flex-col mt-4 space-y-2">
        {userRole === 'Student' || userRole === 'Driver' ? (
          <>
            <NavLink
              to="/student-dashboard"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaTachometerAlt className="mr-3" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>

            <NavLink
              to="/bus-location"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaMapMarkerAlt className="mr-3" />
              {isOpen && <span>Bus Location</span>}
            </NavLink>

            <NavLink
              to="/bus-schedules"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaEye className="mr-3" />
              {isOpen && <span>Bus Schedules</span>}
            </NavLink>

            <NavLink
              to="/activity"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaUserFriends className="mr-3" />
              {isOpen && <span>Activity</span>}
            </NavLink>

            <NavLink
              to="/personal-info"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaCog className="mr-3" />
              {isOpen && <span>Personal Info</span>}
            </NavLink>

            <NavLink
              onClick={logout}
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg cursor-pointer"
            >
              <FaSignOutAlt className="mr-3" />
              {isOpen && <span>LogOut</span>}
            </NavLink>
          </>
        ) : userRole === 'Admin' && (
          <>
            <NavLink
              to="/dashboard"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaTachometerAlt className="mr-3" />
              {isOpen && <span>Dashboard</span>}
            </NavLink>

            <NavLink
              to="/bus-location"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaMapMarkerAlt className="mr-3" />
              {isOpen && <span>Bus Location</span>}
            </NavLink>

            <NavLink
              to="/activity"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaUserFriends className="mr-3" />
              {isOpen && <span>Activity</span>}
              </NavLink>
              <NavLink
              to="/personal-info"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaCog className="mr-3" />
              {isOpen && <span>Personal Info</span>}
              </NavLink>
              
              <NavLink
              to="/BusAndRoutes"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaUserPlus className="mr-3" />
              {isOpen && <span>Bus And Routes</span>}
              </NavLink>

              <NavLink
              to="/bus-schedules"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaEye className="mr-3" />
              {isOpen && <span>Bus Schedules</span>}
            </NavLink>
              
              

            <NavLink
              to="/add-user"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaUserPlus className="mr-3" />
              {isOpen && <span>Add User</span>}
            </NavLink>

            <NavLink
              to="/view-users"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaEye className="mr-3" />
              {isOpen && <span>View Users</span>}
            </NavLink>

            <NavLink
              to="/all-drivers"
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg"
              activeClassName="bg-gray-700/50"
            >
              <FaBus className="mr-3" />
              {isOpen && <span>All Drivers</span>}
            </NavLink>

            <NavLink
              onClick={logout}
              className="flex items-center px-4 py-3 hover:bg-gray-700/50 transition duration-300 rounded-lg cursor-pointer"
            >
              <FaSignOutAlt className="mr-3" />
              {isOpen && <span>LogOut</span>}
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
