import useAuth from "../hooks/use-auth";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function LiveClock() {
  const { time, setTime } = useAuth();
  const [timerWait, setTimerWait] = useState(true);


  useEffect(() => {
    axios
      .get("http://worldtimeapi.org/api/timezone/Asia/Bangkok")
      .then((res) => new Date(res.data.datetime))
      .then((datetime) => {
        setInterval(() => {
          datetime.setSeconds(datetime.getSeconds() + 1);
          setTime(datetime);
          setTimerWait(false);
          console.log('first')
        }, 1000);
      });

    // setInterval(() => {
    //   console.log("first");
    //   axios
    //     .get("http://worldtimeapi.org/api/timezone/Asia/Bangkok")
    //     .then((res) => setTime(res.data.datetime.split("T")[1].split(".")[0]));
    // }, 1000);
  }, []);
  return <div>{timerWait ? <h1>Loading ... </h1> : <>{'time'}</>}</div>;
}
