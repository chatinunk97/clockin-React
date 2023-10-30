
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { IoLocationSharp } from "react-icons/io5";
import InfoClockin from "./InfoClockinList";
import InfoClockinItem from "./InfoClockinItem";
export default function ClockinMainPage() {
  const handlesideButton = () => {
    console.log("Clicked");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center text-xl p-2">
        <h1>NAME LASTNAME</h1>
        <h1 className="text-3xl font-bold">9:00</h1>
        <h1>Friday, 27 Oct 2023  gmt+7</h1>
      </div>
      <div className=" border border-black w-[360px] h-[800px]  md:w-[800px] md:h-[1200x] text-center">
        MAP
      </div>
      <div className="flex w-[360px] mt-2 md:w-[800px] justify-center items-center">
        <div className="flex justify-between w-[360px] md:w-[800px] p-2">
          <div className="flex gap-2 justify-center items-center hover:text-blue-500">
            <button className="text-3xl text-green-600 hover:text-blue-500"><IoLocationSharp /></button>
            <h1>Location</h1>
          </div>
          <h1>BKK</h1>
        </div>
      </div>
      <hr className=" w-[360px] md:w-[800px] " />
      <div className="overflow-hidden overflow-y-auto h-[1200px] p-2">
        <InfoClockinItem />
      </div>
      <div className="mt-20 md:mt-8 h-screen">
        <button className="bg-green-600 w-[200px] p-4 font-semibold text-white rounded-3xl hover:bg-green-400">Clock In</button>
      </div>
    </div>
  )
}

