import { useEffect, useState } from "react";
import useAxios from "./hooks/useAxios";
import MapComponent from "./components/MapComponent";
import SeatComponent from "./components/SeatComponent";
import Sidebar from "./components/Sidebar";
import NoBusesToday from "./components/NoBusesToday";

const App = () => {
  const axios = useAxios();
  const [gps_data, set_gps_data] = useState([]);
  const [booked_seat, set_booked_seat] = useState(0);
  const [studentLocations, setStudentLocations] = useState([]); // State for student location
  const [todaysRoutes, setTodaysRoutes] = useState([]);
  const [isTraced, setIsTraced] = useState(false);
  const [gpsParam, setGpsParam] = useState('');


  useEffect(() => {
    const fetchData = () => {
      if (gpsParam) {
        axios.get(`/gps?busName=${gpsParam}`).then((data) => set_gps_data(data.data));
      } else {
        axios.get(`/gps`).then((data) => set_gps_data(data.data));
      }

      axios.get(`/booked-seat`).then((data) => set_booked_seat(data.data));
      axios.get(`/students-location`).then((res) => setStudentLocations(res.data));
    };

    // Fetch data immediately
    fetchData();

    // Set interval to fetch data every 2 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clear interval when gpsParam changes or on component unmount
    return () => clearInterval(intervalId);
  }, [gpsParam]);

  const formatedDate = (dateObj) => {
    const day = dateObj?.getDate();
    const month = dateObj?.getMonth();
    const year = dateObj?.getFullYear();
    return `${day}-${month+1}-${year}`
  }

  useEffect(() => {
    axios.get(`/get-bus-schedules/${formatedDate(new Date())}`).then((res) => {
      console.log('todays route', res?.data?.allRoutes);
      setTodaysRoutes(res?.data?.allRoutes); // Fix: Remove unnecessary spread operator
    });
  }, []); // Dependency array for initial render
  
  useEffect(() => {
    console.log('td', todaysRoutes); // This will log updated state whenever it changes
  }, [todaysRoutes]); // Dependency on todaysRoutes
  if (!todaysRoutes) {
    return <NoBusesToday></NoBusesToday>;
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col md:flex-row">
        <MapComponent
          locationData={gps_data}
          setLocationData={set_gps_data}
          studentLocations={studentLocations}
          todaysRoutes={todaysRoutes}
          setGpsParam={setGpsParam}
          isTraced={isTraced}
          setIsTraced={setIsTraced}
          className="flex-1"
        ></MapComponent>
        <SeatComponent totalSeats={32} bookedSeats={booked_seat.booked} />
      </div>
    </div>
  );
};

export default App;
