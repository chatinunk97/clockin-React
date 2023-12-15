import { useState } from "react";
import MyRequestList from "../../../../components/MyRequestList";
import { useEffect } from "react";
import useLeave from "../../../../hooks/use-leave";

export default function MyLeavePage() {

  const [myLeave, setMyLeave] = useState([])

  const { getRequestLeaveId, userLeave, myrequestLeave, } = useLeave()


  useEffect(() => {

    getRequestLeaveId()
      .then(res => {
        setMyLeave(userLeave)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (

    <div className="flex justify-center items-start overflow-y-auto h-[90%]">
      <div className="flex flex-col w-[800px] justify-start items-start p-4 rounded-2xl gap-2 ">
        <MyRequestList myLeave={myLeave} myrequestLeave={myrequestLeave} />
      </div>
    </div>
  )

}
