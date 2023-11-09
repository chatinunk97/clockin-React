import Clock from "../../components/LiveClock";

export default function ClockInHeader({ time, setTime, authUser }) {
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p className="font-bold">
        {authUser.firstName} {authUser.lastName}
      </p>
      <Clock time={time} setTime={setTime} />
      <p className="font-semibold">
        {time.toLocaleDateString(undefined, options)}
      </p>
    </div>
  );
}
