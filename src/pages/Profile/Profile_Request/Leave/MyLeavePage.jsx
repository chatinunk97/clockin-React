import { useState } from "react";
import MyRequestList from "../../../../components/MyRequestList";
import { useEffect } from "react";
import useLeave from "../../../../hooks/use-leave";

export default function MyLeavePage() {

  const [myLeave, setMyLeave] = useState([])

  const { getRequestLeaveId, userLeave, myrequestLeave } = useLeave()


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

    <div className="w- flex justify-center items-start h-screen ">
      <div className="flex flex-col w-[800px] justify-start items-start h-screen overflow-y-auto p-4 rounded-2xl gap-2 ">
        <MyRequestList myLeave={myLeave} myrequestLeave={myrequestLeave} />
      </div>
    </div>
  )

}
