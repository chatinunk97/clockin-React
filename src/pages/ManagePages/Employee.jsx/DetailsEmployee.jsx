import GoogleMap from "../../../config/GoogleMap/Map";
import useAuth from "../../../hooks/use-auth";
export default function DetailsEmployee({ selectedRowData }) {
  const detailItems = [
    { label: "ClockIn Time", key: "Clockin" },
    { label: "ClockOut Time", key: "Clockout" },
    { label: "Late Information", key: "ReasonLate" },
    { label: "Location Information", key: "ReasonLocation" },
  ];

  const { authUser } = useAuth();
  const { latitudeCompany: lat, longitudeCompany: lng } =
    authUser.companyProfile.companyLocations[0];
  const companyLocation = { lat, lng };

  return (
    <form className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6 md:pt-4 md:pl-20 md:pr-20 md:pb-12 cursor-default">
      {detailItems.map((item) => (
        <div
          key={item.key}
          className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 text-xl text-center"
        >
          <h1 className="text-azure-500 font-bold">{item.label}</h1>
          <h1 className="border border-stone-200 p-2 rounded-md">
            {selectedRowData[item.key] !== "" &&
            selectedRowData[item.key] !== null
              ? selectedRowData[item.key]
              : "No Information"}
          </h1>
        </div>
      ))}

      <div className="h-72 w-[95%] border border-stone-300 text-center flex justify-center flex-col rounded-md">
        <GoogleMap
          location={{
            lat: selectedRowData.latitudeClockIn,
            lng: selectedRowData.longitudeClockIn,
          }}
          companyLocation={companyLocation}
        />
      </div>

      <div className="h-72 w-[95%] border border-stone-300 text-center flex justify-center flex-col rounded-md">
        {!selectedRowData.latitudeClockOut ? (
          <h1>No Clock out information yet</h1>
        ) : (
          <GoogleMap
            location={{
              lat: selectedRowData.latitudeClockOut,
              lng: selectedRowData.longitudeClockOut,
            }}
            companyLocation={companyLocation}
          />
        )}
      </div>
    </form>
  );
}
