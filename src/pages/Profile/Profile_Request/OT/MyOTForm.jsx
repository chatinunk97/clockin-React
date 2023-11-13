import useOT from "../../../../hooks/use-OT";
import OTCard from "./OTCard";

export default function MyOTForm() {
  const { OT } = useOT();

  return (
    <div className="w- flex justify-center items-start h-screen ">
      <div className="flex flex-col w-[800px] justify-start items-start h-screen overflow-y-auto p-4 shadow-lg rounded-2xl gap-2">
        {OT.map((OT) => (
          <OTCard key={OT.id} OT={OT} />
        ))}
      </div>
    </div>
  );
}
