import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { GoogleAPI_KEY } from "../../../env";

export default function Home({ location }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GoogleAPI_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  console.log(location);
  return <Map location={location} />;
}

function Map({ location }) {
  return (
    <GoogleMap
      options={{ mapTypeControl: false  ,  zoomControl : false ,streetViewControl : false}}
      zoom={19}
      center={location}
      mapContainerStyle={{ width: "100%", height: "100%" }}
    >
      <Marker position={location}></Marker>
      <Circle
        center={location}
        radius={20}
        options={{
          fillColor: "red", // Change the fill color of the circle
          strokeOpacity: 0, // Change the outline opacity (0 to 1)
          fillOpacity: 0.2, // Change the fill opacity (0 to 1)
        }}
      ></Circle>
    </GoogleMap>
  );
}
