import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const AvailableDriver = ({ availableDriver, refetch_availableDriver}) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const handleDelete = (driver_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        popup: "glass-swal",
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/remove-driver/${driver_id}`)
          .then(() => {
            refetch_availableDriver();
            return Swal.fire({
              titleText: "Successfully Deleted",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "glass-swal",
                icon: "no-bg",
              },
            });
          })

          .catch((err) => {
            return Swal.fire({
              titleText: err?.response?.data?.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "glass-swal",
              },
            });
          });
      }
    });
  };
    return (
        <div className="p-6 backdrop-blur-md bg-gray-600 bg-opacity-10 rounded-xl shadow-2xl border border-white border-opacity-20 overflow-y-auto h-64">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Available Driver</h2>
          <ul className="space-y-2 text-gray-100">
            {availableDriver.map((driver, index) => (
              <li key={index} className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-2 shadow-md">
                {driver?.name}
                <FaTrash onClick={() => handleDelete(driver._id)} className="text-red-500 cursor-pointer" />
              </li>
            ))}
          </ul>
          <button onClick={() => navigate("/add-user")} className="mt-4 py-1 px-4 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300">
            Add Driver
          </button>
        </div>
    );
};

export default AvailableDriver;