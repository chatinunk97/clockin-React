export default function OTCard({ OT }) {
  return (
    <div className="w-full h-36 border border-black rounded-2xl flex shadow-lg">
      <div className="flex h-full items-center p-2 justify-start gap-6 w-full">
        <div>ICON</div>
        <div>
          <div className="flex flex-col gap-2">
            <h1>{OT?.clock?.clockInTime.split("T")[0]}</h1>
            <h1>{`${OT?.startTime}-${OT?.endTime}`}</h1>
            <h1>{OT?.messageOT}</h1>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-end">
        <h1>{OT?.statusOT}</h1>
      </div>
    </div>
  );
}
