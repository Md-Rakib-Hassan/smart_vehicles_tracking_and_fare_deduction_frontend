import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Swal from "sweetalert2"; // Import SweetAlert

import useAxios from "../hooks/useAxios";
import "../css/sweetAlartGlass.css";
import Loading from "./Loading";

const MapComponent = ({ locationData, studentLocations }) => {
  const { latitude, longitude } = locationData || {}; // Destructure with fallback
  const axios = useAxios();

  // Loading state when latitude and longitude are not available
  if (!latitude || !longitude) {
    return <Loading></Loading>
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
                icon: 'no-bg'
                
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
            icon: 'no-bg'
            
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

  return (
    <div className="w-full min-h-screen p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white drop-shadow-lg">
          Live Bus Location
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
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
            center={[latitude, longitude]}
            zoom={15}
            className="h-[60vh] md:h-[80vh] w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[latitude, longitude]}
              icon={busCustomeIcon}
            ></Marker>
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
