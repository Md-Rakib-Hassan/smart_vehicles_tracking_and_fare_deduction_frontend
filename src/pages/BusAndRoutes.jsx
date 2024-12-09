import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import AvailableLocation from "../components/AvailableLocation";
import AvailableBus from "../components/AvailableBus";
import AvailableDriver from "../components/AvailableDriver";
import AllRoutes from "../components/AllRoutes";
import BusWithRoute from "../components/BusWithRoute";
import LinkWithRoute from "../components/LinkWithRoute";
import "../css/sweetAlartGlass.css";
import "../css/scrollBarCustomization.css";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { Route } from "react-router-dom";
// import { newDate } from "react-datepicker/dist/date_utils";

const BusAndRoutes = () => {
  // const [availableBus, setAvailableBus] = useState(['Dolphin', 'Shapla', 'Joba']);
  // const [availableLocation, setAvailableLocation] = useState([
  //   "Dhanmondi",
  //   "DIU",
  //   "Mirpur",
  // ]);
  // const [availableDriver, setAvailableDriver] = useState(["Shakib", "Ridwan"]);
  const [allRoutes, setAllRoutes] = useState({});
  const [busRoutes, setBusRoutes] = useState([]);
  const [RouteTime, setRouteTime] = useState([]);
  const [busDate,setBusDate]=useState({});
  const [route, setRoute] = useState({ bus: "", from: "", to: "", driver: "" });
  const axios = useAxios();
  
  // const formatedDate = (dateObj) => {
  //   const day = dateObj.getDate();
  //   const month = dateObj.getMonth();
  //   const year = dateObj.getFullYear();
  //   return `${day}-${month+1}/${year}`
  // }

  const {
    data: availableBus,
    isLoading:loadingAvailableBus,
    refetch: refetch_availableBus,
  } = useQuery({
    queryKey: "availableBus",
    queryFn: async () => {
      const res = await axios.get("/available-bus");
      return res.data;
    },
  });

  const {
    data: availableLocation,
    isLoading:loadingAvailableLocation,
    refetch: refetch_availableLocation,
  } = useQuery({
    queryKey: "availableLocation",
    queryFn: async () => {
      const res = await axios.get("/available-location");
      return res.data;
    },
  });


  const {
    data: availableDriver,
    isLoading:loadingAvailableDriver,
    refetch: refetch_availableDriver,
  } = useQuery({
    queryKey: "availableDriver",
    queryFn: async () => {
      const res = await axios.get("/all-driver");
      return res.data;
    },
  });
  useEffect(() => {
    trackRoutes(RouteTime);
  }, [allRoutes])

  const formatedDate = (dateObj) => {
    const day = dateObj?.getDate();
    const month = dateObj?.getMonth();
    const year = dateObj?.getFullYear();
    return `${day}-${month+1}-${year}`
  }
  const handleLoad = () => {
    if (!busDate?.str) {
      return Swal.fire({
        titleText: "Select a Date first!!",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "glass-swal",
        },
      });
    }
    axios.get(`/get-bus-schedules/${busDate?.str}`).then(res => {
      // console.log(`url /get-bus-schedules/${formatedDate(busDate)}`);
      // console.log(res.data.allRoutes);
      setRouteTime(res?.data?.allRoutes);
    })
  }

  function trackRoutes(data) {
    const routeCounts = {};
    data?.forEach(entry => {
        const routeKey = `${entry.from}-${entry.to}`;
        if (routeCounts[routeKey]) {
            routeCounts[routeKey]++;
        } else {
            routeCounts[routeKey] = 1;
        }
    });

    setAllRoutes(routeCounts);
}
console.log("Parent allRoutes:", allRoutes);

  const cmphr = (f_hr,s_hr) => {
    const fhr = parseInt(f_hr.split(':')[0]);
    const shr = parseInt(s_hr.split(':')[0]);
    return Math.abs(fhr - shr)<=2;
  }


  const handleAddRoute = (route_data) => {
    let should_push = true;
    if (!busDate) {
      return Swal.fire({
        titleText: "Select a Date first!!",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "glass-swal",
        },
      });
    }
    for (let i = 0; i < RouteTime.length; i++){
      console.log(RouteTime[i]?.time, route_data?.time);
      if ((RouteTime[i]?.bus === route_data?.bus || RouteTime[i]?.driver === route_data?.driver) && cmphr(RouteTime[i].time, route_data.time)) {
        should_push = false;
        Swal.fire({
          title: "Are you sure?",
          text: "This bus or driver has already been scheduled, and assigning it within less than 2 hours is not feasible!",
          icon: "warning",
          showCancelButton: true,
          customClass: {
            popup: "glass-swal",
          },
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, proceed!",
        }).then((result) => {
          if (result.isConfirmed) {
            setRouteTime([...RouteTime, route_data]);
            trackRoutes(RouteTime);
          }
          
        });
      }
    }
    if (should_push) {
      setRouteTime([...RouteTime, route_data]);
      console.log(RouteTime);
      trackRoutes(RouteTime);
    }
    
  }
  if (loadingAvailableBus || loadingAvailableLocation || loadingAvailableDriver ) return <Loading></Loading>
  // const handleAddData = (type) => {
  //   Swal.fire({
  //     title: `Add to ${type}`,
  //     input: 'text',
  //     inputPlaceholder: `Enter new ${type}`,
  //     showCancelButton: true,
  //     confirmButtonText: 'Add',
  //     customClass: {
  //       popup: "glass-swal",
  //       icon: 'no-bg'
  //     },
  //     preConfirm: (value) => {
  //       if (!value) {
  //         Swal.showValidationMessage('Please enter a value');
  //       }
  //       return value;
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       if (type === 'Available Bus') {
  //         // setAvailableBus([...availableBus, result.value]);
  //       } else if (type === 'Available Location') {
  //         setAvailableLocation([...availableLocation, result.value]);
  //       } else if (type === 'Available Driver') {
  //         setAvailableDriver([...availableDriver, result.value]);
  //       }
  //     }
  //   });
  // };

  // const handleDelete = (type, item) => {
  //   if (type === "Available Bus") {
  //     // setAvailableBus(availableBus.filter(bus => bus !== item));
  //     setBusRoutes(busRoutes.filter((route) => route.bus !== item));
  //   } else if (type === "Available Location") {
  //     setAvailableLocation(
  //       availableLocation.filter((location) => location !== item)
  //     );
  //     setBusRoutes(
  //       busRoutes.filter((route) => route.from !== item && route.to !== item)
  //     );
  //   } else if (type === "Available Driver") {
  //     setAvailableDriver(availableDriver.filter((driver) => driver !== item));
  //     setBusRoutes(busRoutes.filter((route) => route.driver !== item));
  //   }
  // };

  // const handleAddRoute = () => {
  //   if (route.bus && route.from && route.to && route.driver) {
  //     const newBusRoutes = [...busRoutes, route];
  //     const routeName = `${route.from} to ${route.to}`;

  //     const routeIndex = allRoutes.findIndex(r => r.name === routeName);
  //     if (routeIndex >= 0) {
  //       allRoutes[routeIndex].frequency += 1;
  //     } else {
  //       allRoutes.push({ name: routeName, frequency: 1 });
  //     }

  //     setBusRoutes(newBusRoutes);
  //     setAllRoutes([...allRoutes]);
  //     // setAvailableBus(availableBus.filter(bus => bus !== route.bus));
  //     setAvailableDriver(availableDriver.filter(driver => driver !== route.driver));
  //     setRoute({ bus: '', from: '', to: '', driver: '' });
  //   }
  // };

  // const handleDeleteRoute = (route) => {
  //   const routeName = `${route.from} to ${route.to}`;
  //   const routeIndex = allRoutes.findIndex(r => r.name === routeName);

  //   if (routeIndex >= 0) {
  //     allRoutes[routeIndex].frequency -= 1;
  //     if (allRoutes[routeIndex].frequency === 0) {
  //       allRoutes.splice(routeIndex, 1);
  //     }
  //   }

  //   setAllRoutes([...allRoutes]);
  //   // setAvailableBus([...availableBus, route.bus]);
  //   setAvailableDriver([...availableDriver, route.driver]);
  //   setBusRoutes(busRoutes.filter(r => r !== route));
  // };

  const handleDeleteRoute = (route) => {

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
        console.log('clicked on', route);
    const updatedRouteTime = RouteTime.filter(rt => rt.bus != route.bus && rt.driver != route.driver);
    // console.log('new route', updatedRouteTime);
    setRouteTime(updatedRouteTime);
    trackRoutes(RouteTime);
      }
    });
    
  }

  const handlePublish = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to publish the schedules!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        popup: "glass-swal",
      },
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, publish it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        const data = {
          date: busDate.str,
          allRoutes:RouteTime
        }
        axios.post('/add-bus-schedules', data)
          .then(() => {
            return Swal.fire({
              titleText: "Successfully Published Schedule",
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
    

  }
  
  




  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center text-white space-y-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Available Bus Container */}
        <AvailableBus
          availableBus={availableBus}
          refetch_availableBus={refetch_availableBus}
        ></AvailableBus>

        {/* Available Location Container */}
        <AvailableLocation
          availableLocation={availableLocation}
          refetch_availableLocation={refetch_availableLocation}
        ></AvailableLocation>

        {/* Available Driver Container */}
        <AvailableDriver
          availableDriver={availableDriver}
          refetch_availableDriver={refetch_availableDriver}
        ></AvailableDriver>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* All Routes Container */}
        <AllRoutes allRoutes={allRoutes}></AllRoutes>

        {/* Bus with Route Container */}
        <BusWithRoute
          RouteTime={RouteTime}
          setBusDate={setBusDate}
          busDate={busDate}
          handleDeleteRoute={handleDeleteRoute}
          handlePublish={handlePublish}
          handleLoad={handleLoad}
          // handleDeleteRoute={handleDeleteRoute}
        ></BusWithRoute>

        {/* Link with Route Container */}
        <LinkWithRoute
          route={route}
          setRoute={setRoute}
          availableBus={availableBus}
          availableLocation={availableLocation}
          availableDriver={availableDriver}
          RouteTime={RouteTime}
          setRouteTime={setRouteTime}
          handleAddRoute={handleAddRoute}
        ></LinkWithRoute>
      </div>
      
    </div>
  );
};

export default BusAndRoutes;
