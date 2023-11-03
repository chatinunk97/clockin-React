import Clock from "../../components/LiveClock";

export default function ClockInHeader({ time, waitTimer, setTime }) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-xl p-2">
        <h1>NAME LASTNAME</h1>
        {waitTimer ? (
          <h1>Loading ... </h1>
        ) : (
          <>
            <h1 className="text-3xl font-bold">
              <Clock time={time} setTime={setTime} />
            </h1>
            <h1>{time.toDateString()}</h1>
          </>
        )}
      </div>
    </div>
  );
}
