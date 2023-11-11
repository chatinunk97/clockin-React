import InfoClockinItem from "./InfoClockinItem";
import dateTimeToString from "../../utils/StructureChange/dateTimetoString";

export default function InfoClockin({ clockHistory }) {
  console.log(clockHistory)
  return (
    <div className="flex flex-col  h-full">
      {clockHistory.map((el) => {
        return (
          <div
            key={el.id}
            className="flex gap-2 justify-center items-center w-full h-full p-2"
          >
            <InfoClockinItem
              clockTime={dateTimeToString(el.clockInTime)}
              type={"Clock In"}
            />
            <InfoClockinItem
              clockTime={dateTimeToString(el.clockOutTime)}
              type={"Clock Out"}
            />
          </div>
        );
      })}
    </div>
  );
}
