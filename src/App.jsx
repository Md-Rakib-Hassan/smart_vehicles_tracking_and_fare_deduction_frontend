import { useEffect, useState } from 'react';
import useAxios from './hooks/useAxios';
import MapComponent from './components/MapComponent';
import SeatComponent from './components/SeatComponent';

const App = () => {
  const axios = useAxios();
  const [gps_data, set_gps_data] = useState({});
  const [booked_seat, set_booked_seat] = useState(0);
  const [studentLocations, setStudentLocations] = useState([]); // State for student location
  
  
  
  useEffect(() => {
    setInterval(() => {
      axios.get('/gps')
        .then(data => set_gps_data(data.data));
      axios.get('/booked-seat')
        .then(data => set_booked_seat(data.data));
        axios.get("/students-location")
        .then(res => setStudentLocations(res.data));
      
    },5000);
    
  }, [axios]);
  return (
    <div className='flex flex-col md:flex-row'>
      <MapComponent locationData={gps_data} studentLocations={studentLocations} className='flex-1'></MapComponent>
      <SeatComponent totalSeats={32} bookedSeats={booked_seat.booked} />
      
    </div>
  );
};

export default App;