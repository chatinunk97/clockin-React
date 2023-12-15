import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import companyLogo from "../../assets/companyLogo.png";
import { GoogleAPI_KEY } from "../../../env";

export default function Home({
  location,
  enableSelect,
  setLocation,
  companyLocation,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GoogleAPI_KEY,
  });
  const [mapCenter, setMapCenter] = useState(location);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Map
      location={location}
      enableSelect={enableSelect}
      setLocation={setLocation}
      companyLocation={companyLocation}
      mapCenter={mapCenter}
      setMapCenter={setMapCenter}
    />
  );
}

function Map({
  location,
  enableSelect,
  setLocation,
  companyLocation,
  mapCenter,
  setMapCenter,
}) {
  return (
    <GoogleMap
      options={{
        mapTypeControl: false,
        zoomControl: enableSelect ? true : false,
        streetViewControl: false,
      }}
      zoom={17.8}
      center={mapCenter}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onClick={(e) => {
        if (enableSelect) {
          setLocation({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }
      }}
    >
      {companyLocation ? (
        <>
          <Marker
            position={companyLocation}
            icon={{
              url: companyLogo,
              scaledSize: new window.google.maps.Size(60, 80),
              anchor: new window.google.maps.Point(30, 80),
            }}
          ></Marker>
          <Circle
            center={companyLocation}
            radius={50}
            options={{
              fillColor: "green",
              strokeOpacity: 0,
              fillOpacity: 0.2,
            }}
          ></Circle>
        </>
      ) : (
        ""
      )}
      <Marker zIndex={100} position={location}></Marker>
    </GoogleMap>
  );
}
