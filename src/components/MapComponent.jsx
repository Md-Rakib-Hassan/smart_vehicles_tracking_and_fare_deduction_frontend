import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Swal from "sweetalert2"; // Import SweetAlert

import useAxios from "../hooks/useAxios";
import "../css/sweetAlartGlass.css";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import formatedDate from "../utils/formatedDate";
import useBusName from "../hooks/useBusName";

const MapComponent = ({
  locationData,
  studentLocations,
  todaysRoutes,
  setGpsParam,
  setIsTraced,
  isTraced
}) => {
  // const { latitude, longitude } = locationData || {}; // Destructure with fallback
  console.log(locationData);
  const axios = useAxios();
  const [targetBus, setTargetBus] = useState({
    date: formatedDate(new Date()),
  });
  console.log('tgtBus', targetBus);
  // State for dropdown selections
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [busLocation, setBusLocation] = useState(locationData);

  useEffect(() => {
    axios
      .post("/get-bus-by-destination", targetBus)
      .then((res) => setSelectedBus(res?.data[0].matchingRoutes));
    console.log(selectedBus);
    // console.log(targetBus);
  }, [targetBus]);
  const bus_id = useBusName(targetBus?.bus);
  console.log(bus_id);

  // if (isTraced) {
  //   const newLocation = locationData.filter((location) => location?.bus_id == 2);
  //   setBusLocation(newLocation);
  // }
  // Loading state when latitude and longitude are not available
 
  if (!locationData[0]?.latitude || !locationData[0]?.longitude) {
    return <Loading></Loading>;
  }

  // Mark and Unmark Location Functions
  const markLocation = () => {
    const id = localStorage.getItem("id");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const payload = { studentID: id, geocode: [latitude, longitude] };
        axios
          .post("/mark-location", payload)
          .then(() =>
            Swal.fire({
              titleText: "Location marked!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "glass-swal",
                icon: "no-bg",
              },
            })
          )
          .catch((err) =>
            Swal.fire({
              titleText: err?.response?.data?.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "glass-swal",
              },
            })
          );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const unmarkLocation = () => {
    const id = localStorage.getItem("id");
    axios
      .post("/unmark-location", { id })
      .then(() =>
        Swal.fire({
          titleText: "Location unmarked!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "glass-swal",
            icon: "no-bg",
          },
        })
      )
      .catch((err) =>
        Swal.fire({
          titleText: err?.response?.data?.message,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "glass-swal",
          },
        })
      );
  };

  // Custom Icons
  const customeIcon = new Icon({
    iconUrl: "./people.png",
    iconSize: [42, 42],
  });
  const busCustomeIcon = new Icon({
    iconUrl: "./bus.png",
    iconSize: [42, 42],
  });

  const handleTrace = () => {
    // const newLocation = locationData.filter((location) => location.bus_id == bus_id);
    // setBusLocation(newLocation);
    // setIsTraced(true);
    setGpsParam(targetBus?.bus);
    console.log(targetBus);
  };

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white drop-shadow-lg">
          Live Bus Location
        </h1>

        <div
          className="w-full max-w-5xl bg-gray-100 rounded-lg shadow-lg mb-3 glass-morphism"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            Select Route and Bus
          </h2>
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-center pb-2">
            <select
              className="p-1 rounded-lg backdrop-blur-md bg-white/30 text-gray-800 shadow-md focus:outline-none"
              value={targetBus.from || ""}
              onChange={(e) =>
                setTargetBus({ ...targetBus, from: e.target.value })
              }
            >
              <option value="" disabled>
                Select From
              </option>
              {todaysRoutes.map((route) => (
                <option key={route?._id} value={route?.from}>
                  {route.from}
                </option>
              ))}
            </select>

            <select
              className="p-1 rounded-lg backdrop-blur-md bg-white/30 text-gray-800 shadow-md focus:outline-none"
              value={targetBus.to || ""}
              onChange={(e) =>
                setTargetBus({ ...targetBus, to: e.target.value })
              }
            >
              <option value="" disabled>
                Select To
              </option>
              {todaysRoutes.map((route) => (
                <option key={route?._id} value={route?.to}>
                  {route?.to}
                </option>
              ))}
            </select>

            <select
              className="p-1 rounded-lg backdrop-blur-md bg-white/30 text-gray-800 shadow-md focus:outline-none"
              value={targetBus?.bus || ""}
              onChange={(e) =>
                setTargetBus({ ...targetBus, bus: e.target.value })
              }
              disabled={!targetBus.from && !targetBus.to}
            >
              <option value="" disabled>
                Select Bus
              </option>
              {selectedBus?.map((bus, index) => (
                <option key={index} value={bus?.bus}>
                  {bus?.bus}
                </option>
              ))}
            </select>
            <button
              onClick={handleTrace}
              className="px-3 py-1  bg-blue-600 bg-opacity-20 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
            >
              Trace
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-3">
          <button
            onClick={markLocation}
            className="flex-1 py-2 rounded-lg transition glass-button  text-white "
            style={{
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(0, 119, 255, 0.3)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            Mark My Location
          </button>
          <button
            onClick={unmarkLocation}
            className="flex-1 py-2 rounded-lg transition glass-button bg-red-100 text-white hover:bg-red-600"
            style={{
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(255, 0, 0, 0.3)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            Unmark My Location
          </button>
        </div>

        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          <MapContainer
            center={[locationData[0].latitude, locationData[0].longitude]}
            zoom={10}
            className="h-[60vh] md:h-[80vh] w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {locationData.map((location) => (
              <Marker
                key={location._id}
                position={[location.latitude, location.longitude]}
                icon={busCustomeIcon}
              ></Marker>
            ))}

            {studentLocations.map((location) => (
              <Marker
                key={location.studentID}
                position={location.geocode}
                icon={customeIcon}
              >
                <Popup>
                  {location.name}
                  <br />
                  ID: {location.studentID}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
