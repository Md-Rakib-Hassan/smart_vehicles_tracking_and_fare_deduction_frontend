import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';

const AvailableLocation = ({ availableLocation, refetch_availableLocation }) => {
  
  const axios = useAxios();
  const handleAddData = () => {
    Swal.fire({
      title: "Add the new bus",
      html: `
        <input type="text" id="locationName" class="swal2-input" placeholder="Enter location name">
        <input type="text" id="geo" class="swal2-input" placeholder="Enter latitude and longatude with comma">
      `,
      showCancelButton: true,
      confirmButtonText: "Add",
      customClass: {
        popup: "glass-swal",
        icon: "no-bg",
      },
      preConfirm: () => {
        const locationName = Swal.getPopup().querySelector("#locationName").value;
        const geo = Swal.getPopup().querySelector("#geo").value;

        if (!locationName || !geo) {
          Swal.showValidationMessage(
            "Please enter both the location name and latitude and longitude"
          );
        }

        return { locationName, geo };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { locationName, geo } = result.value;
        const [latitude, longitude] =geo.split(",");
        axios
          .post("/add-location", { location_name:locationName, geo_location:{latitude,longitude} })
          .then(() => {
            refetch_availableLocation();
            return Swal.fire({
              titleText: "Successfully added",
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

  const handleDelete = (location_id) => {
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
          .delete(`/available-location/${location_id}`)
          .then(() => {
            refetch_availableLocation();
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
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">Available Location</h2>
      <ul className="space-y-2 text-gray-100">
        {availableLocation.map((location, index) => (
          <li key={index} className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-2 shadow-md">
            {location.location_name}
            <FaTrash onClick={() => handleDelete(location._id)} className="text-red-500 cursor-pointer" />
          </li>
        ))}
      </ul>
      <button onClick={handleAddData} className="mt-4 py-1 px-4 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300">
        Add Location
      </button>
    </div>
    );
};

export default AvailableLocation;