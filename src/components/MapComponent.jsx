import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Swal from "sweetalert2"; // Import SweetAlert
import ReactLoading from 'react-loading';
import useAxios from "../hooks/useAxios";

const MapComponent = ({ locationData, studentLocations }) => {
  const { latitude, longitude } = locationData || {}; // Destructure with fallback
  const axios = useAxios();

  // Loading state when latitude and longitude are not available
  if (!latitude || !longitude) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ReactLoading type={'spinningBubbles'} color={'#1189ff'} height={'7%'} width={'7%'} />
      </div>
    );
  }

  // Mark and Unmark Location Functions
  const markLocation = () => {
    const id = localStorage.getItem('id');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const payload = { studentID: id, geocode: [latitude, longitude] };
          axios.post("/mark-location", payload)
            .then(() => Swal.fire('Location marked!', '', 'success'))
            .catch(err => Swal.fire(err?.response?.data?.massage, '', 'error'));
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const unmarkLocation = () => {
    const id = localStorage.getItem('id');
    axios.post("/unmark-location", { id })
      .then(() => Swal.fire('Location unmarked!', '', 'success'))
      .catch(err => Swal.fire(err?.response?.data?.massage, '', 'error'));
  };

  // Custom Icons
  const customeIcon = new Icon({
    iconUrl: "./people.png",
    iconSize: [42, 42]
  });
  const busCustomeIcon = new Icon({
    iconUrl: "./bus.png",
    iconSize: [42, 42]
  });

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600 shadow-md p-2 md:p-3 rounded-md bg-white text-center w-full max-w-lg">
          Live Bus Location
        </h1>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg mb-4">
          <button
            onClick={markLocation}
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Mark My Location
          </button>
          <button
            onClick={unmarkLocation}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Unmark My Location
          </button>
        </div>

        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
          <MapContainer center={[latitude, longitude]} zoom={15} className="h-[60vh] md:h-[80vh] w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]} icon={busCustomeIcon}></Marker>
            {studentLocations.map(location => (
              <Marker key={location.studentID} position={location.geocode} icon={customeIcon}>
                <Popup>{location.name}<br />ID: {location.studentID}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
