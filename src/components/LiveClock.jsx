import { useEffect } from "react";
export default function LiveClock({ time, setTime }) {
  useEffect(() => {
    const timer = setInterval(() => {
   setTime((prev)=>{
    const newDate = new Date(prev.getTime())
    newDate.setSeconds(newDate.getSeconds() + 1);
    return newDate
   })

    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <h1>{time.toTimeString().split(" ")[0]}</h1>
    </div>
  );
}
