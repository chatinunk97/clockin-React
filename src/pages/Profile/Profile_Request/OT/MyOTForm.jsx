import useOT from "../../../../hooks/use-OT";
import MyOTList from "./MyOTList";

export default function MyOTForm() {
  const { OT } = useOT();

  return (
    <div className="flex justify-center items-start overflow-y-auto h-[90%]">
      <div className="flex flex-col w-[800px] justify-start items-start p-4 rounded-2xl gap-2">
        <MyOTList OT={OT} />
      </div>

    </div>
  );
}
