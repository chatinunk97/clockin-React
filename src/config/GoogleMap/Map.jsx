import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { GoogleAPI_KEY } from "../../../env";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GoogleAPI_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map/>;
}

function Map() {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -88 }}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
    <Marker position={{ lat: 44, lng: -88 }}></Marker>
    </GoogleMap>

  );
}
