import React from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const AvailableBus = ({ availableBus, refetch_availableBus }) => {
  const axios = useAxios();
  const handleAddData = () => {
    Swal.fire({
      title: "Add the new bus",
      html: `
        <input type="text" id="busName" class="swal2-input" placeholder="Enter bus name">
        <input type="text" id="busId" class="swal2-input" placeholder="Enter bus ID">
      `,
      showCancelButton: true,
      confirmButtonText: "Add",
      customClass: {
        popup: "glass-swal",
        icon: "no-bg",
      },
      preConfirm: () => {
        const busName = Swal.getPopup().querySelector("#busName").value;
        const busId = Swal.getPopup().querySelector("#busId").value;

        if (!busName || !busId) {
          Swal.showValidationMessage(
            "Please enter both the bus name and bus ID"
          );
        }

        return { busName, busId };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { busName, busId } = result.value;
        console.log({ bus_id: busId, bus_name: busName });
        axios
          .post("/add-bus", { bus_id: busId, bus_name: busName })
          .then(() => {
            refetch_availableBus();
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

  const handleDelete = (bus_id) => {
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
          .delete(`/available-bus/${bus_id}`)
          .then(() => {
            refetch_availableBus();
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
      <h2 className="text-2xl font-semibold text-gray-200 mb-4">
        Available Bus
      </h2>
      <ul className="space-y-2 text-gray-100">
        {availableBus.map((bus, index) => (
          <li
            key={index}
            className="flex justify-between items-center backdrop-blur-lg bg-white bg-opacity-20 rounded-lg p-2 shadow-md"
          >
            {bus.bus_name}
            <FaTrash
              onClick={() => handleDelete(bus._id)}
              className="text-red-500 cursor-pointer"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleAddData()}
        className="mt-4 py-1 px-4 bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
      >
        Add Bus
      </button>
    </div>
  );
};

export default AvailableBus;
