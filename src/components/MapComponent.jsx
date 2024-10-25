import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2"; // Import SweetAlert
import ReactLoading from 'react-loading';

// Fix for default marker icon issue in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapComponent = ({ locationData }) => {
  const { latitude, longitude } = locationData || {}; // Destructure with fallback
  const [userLocation, setUserLocation] = useState(null); // State for user location
  const [userId, setUserId] = useState(null); // State for user ID

  // Only render the map if both latitude and longitude are valid
  if (!latitude || !longitude) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ReactLoading type={'spinningBubbles'} color={'#1189ff'} height={'7%'} width={'7%'} />
      </div>
    ); // Render a loading state or placeholder
  }

  // Function to get user location
  const shareLocation = (userId) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]); // Update state with user location
          setUserId(userId); // Set the user ID
          console.log(`User ID: ${userId}, Location: ${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleShareLocationClick = () => {
    Swal.fire({
      title: 'Enter Your ID',
      input: 'text',
      inputPlaceholder: 'Enter your ID',
      showCancelButton: true,
      confirmButtonText: 'Share Location',
      cancelButtonText: 'Cancel',
      preConfirm: (userId) => {
        if (!userId) {
          Swal.showValidationMessage('Please enter a valid ID');
        }
        return userId;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        shareLocation(result.value);
        Swal.fire('Location shared!', '', 'success');
      }
    });
  };

  return (
    <div className="w-full">
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600 shadow-md p-3 rounded-md bg-white">
          Live Bus Location
        </h1>
        <button
          onClick={handleShareLocationClick} // Open SweetAlert when clicked
          className="mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Share My Location
        </button>

        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <MapContainer
            center={[latitude, longitude]} // Initial center from props
            zoom={15} // Zoom level
            className="h-[80vh] w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DynamicMarker position={[latitude, longitude]} />
            {userLocation && <DynamicUserMarker position={userLocation} userId={userId} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

// Custom hook to smoothly pan the map to a new position
function DynamicMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    map.panTo(position, { animate: true, duration: 1 });
  }, [position, map]);

  return <Marker position={position} />;
}

// Marker for the user's location with Popup
function DynamicUserMarker({ position, userId }) {
  const redIcon = new L.Icon({
    iconUrl: "people.png", // A valid red marker icon
    shadowUrl: "people.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <Marker position={position} icon={redIcon}>
      <Popup>
        Student ID: {userId} {/* Display user ID in Popup */}
      </Popup>
    </Marker>
  );
}

export default MapComponent;
