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
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      location={location}
      enableSelect={enableSelect}
      setLocation={setLocation}
      companyLocation={companyLocation}
    />
  );
}

function Map({ location, enableSelect, setLocation, companyLocation }) {
  return (
    <GoogleMap
      options={{
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
      }}
      zoom={17.8}
      center={location}
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
              scaledSize: new window.google.maps.Size(60, 80), // Adjust the size here
              anchor: new window.google.maps.Point(30, 80),
            }}
          ></Marker>
          <Circle
            center={companyLocation}
            radius={50}
            options={{
              fillColor: "green", // Change the fill color of the circle
              strokeOpacity: 0, // Change the outline opacity (0 to 1)
              fillOpacity: 0.2, // Change the fill opacity (0 to 1)
            }}
          ></Circle>
        </>
      ) : (
        ""
      )}
      <Marker position={location}></Marker>
    </GoogleMap>
  );
}
