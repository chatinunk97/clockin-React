import Clock from "../../components/LiveClock";

export default function ClockInHeader({ time, setTime , authUser }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-xl p-2">
        <h1>{authUser.firstName} {authUser.lastName}</h1>
        <h1 className="text-3xl font-bold">
          <Clock time={time} setTime={setTime} />
        </h1>
        <h1>{time.toDateString()}</h1>
      </div>
    </div>
  );
}
