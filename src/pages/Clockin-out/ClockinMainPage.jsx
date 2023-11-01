import InfoClockinItem from "./InfoClockinItem";
import ClockInlocation from "./ClockInlocation";
import ClockInHeader from "./ClockInHeader";
import GoogleMap from "../../config/GoogleMap/Map";
import { useEffect } from "react";
import { useState } from "react";
export default function ClockinMainPage() {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [waiting, setWaiting] = useState(true);
  useEffect(() => {
    if (navigator.geolocation) {
      setWaiting(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // User allowed access to their location
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation({ lat: +latitude, lng: +longitude });
          console.log(
            `User's location: Latitude ${latitude}, Longitude ${longitude}`
          );
          setWaiting(false);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            // User denied access to their location
            console.error("User denied access to their location.");
          } else {
            // Handle other geolocation-related errors
            console.error("Error getting geolocation: " + error.message);
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <ClockInHeader />
      </div>
      <div className="overflow-hidden border border-black w-[360px] h-[800px]  md:w-[800px] md:h-[1200x]">
        {waiting ? <img src="https://media.tenor.com/Dz9GFJ9ngPQAAAAd/me-waiting-for-v-movie-trailer-on-prime-mr-bean.gif"></img> : <GoogleMap location={location} />}
      </div>
      <div>
        <ClockInlocation />
      </div>
      <hr className=" w-[360px] md:w-[800px] " />
      <div className="overflow-hidden overflow-y-auto h-[1200px] p-2">
        <InfoClockinItem />
      </div>
      <div className="mt-20 md:mt-8 h-screen">
        <button className="bg-green-600 w-[200px] p-4 font-semibold text-white rounded-3xl hover:bg-green-400">
          Clock In
        </button>
      </div>
    </div>
  );
}
