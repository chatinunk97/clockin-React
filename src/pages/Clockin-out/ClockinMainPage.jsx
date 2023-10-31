
import InfoClockinItem from "./InfoClockinItem";
import ClockInlocation from "./ClockInlocation";
import ClockInHeader from "./ClockInHeader";
export default function ClockinMainPage() {

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <ClockInHeader />
      </div>
      <div className=" border border-black w-[360px] h-[800px]  md:w-[800px] md:h-[1200x] text-center">
        MAP
      </div>
      <div>
        <ClockInlocation />
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

