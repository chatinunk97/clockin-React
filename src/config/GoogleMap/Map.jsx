import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle,
} from "@react-google-maps/api";
import { GoogleAPI_KEY } from "../../../env";

export default function Home({ location, enableSelect, setLocation }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GoogleAPI_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      location={location}
      enableSelect={enableSelect}
      setLocation={setLocation}
    />
  );
}

function Map({ location, enableSelect , setLocation }) {
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
            lat : e.latLng.lat(),
            lng : e.latLng.lng()
          })
        }
      }}
    >
      <Marker position={location}></Marker>
      {enableSelect ? (
        ""
      ) : (
        <Circle
          center={location}
          radius={50}
          options={{
            fillColor: "red", // Change the fill color of the circle
            strokeOpacity: 0, // Change the outline opacity (0 to 1)
            fillOpacity: 0.2, // Change the fill opacity (0 to 1)
          }}
        ></Circle>
      )}
    </GoogleMap>
  );
}
