import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Swal from "sweetalert2"; // Import SweetAlert
import ReactLoading from 'react-loading';
import useAxios from "../hooks/useAxios";


const MapComponent = ({ locationData,studentLocations}) => {
  const { latitude, longitude } = locationData || {}; // Destructure with fallback
  const axios = useAxios();

  // Only render the map if both latitude and longitude are valid
  if (!latitude || !longitude ) {
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
          const payload={studentID:userId, geocode:[latitude, longitude]}
          axios.post("/students-location", payload)
            .then(res => {
              if (res.status == 200) {
                return Swal.fire('Location shared!', '', 'success');
              }
              console.log(res);
              return Swal.fire(res.massage, '', 'error');
            }).catch(err => {
              return Swal.fire(err?.response?.data?.massage, '', 'error');
            });
        },
        
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const customeIcon = new Icon({
    iconUrl: "./people.png",
    iconSize:[42,42]
  })

  const busCustomeIcon = new Icon({
    iconUrl: "./bus.png",
    iconSize:[42,42]
  })

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
        <MapContainer center={[latitude, longitude]} zoom={15} className="h-[80vh] w-full"  >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={busCustomeIcon}></Marker>
        {studentLocations.map(location => (<Marker key={location} position={location.geocode} icon={customeIcon}>
          
          <Popup>{location.name}<br/>ID: {location.studentID}</Popup>
        </Marker>))}

      </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
