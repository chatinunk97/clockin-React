// import { useState, useEffect } from "react";
// import DefaultLeaveList from "./DefaultLeaveList";
// import SubmitButton from "../../../components/SubmitButton";
// import useManage from "../../../hooks/use-manage";

// export default function ManageLeaveSetting() {
//   const { getAllLeaveProfile } = useManage();
//   const [allLeave, setAllLeave] = useState([]);

//   useEffect(() => {
//     getAllLeaveProfile()
//       .then((res) => {
//         setAllLeave(res.data.allLeaveProfile);
//         console.log(allLeave);
//         console.log(res.data.allLeaveProfile);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="w-full flex flex-col m-auto items-center gap-3 p-10 mx-72 bg-gray-200 rounded-lg">
//       <h1 className="text-lg font-bold">Default Leaves</h1>
//       <div className="flex flex-col gap-3">
//         {allLeave.map((el) => (
//           <DefaultLeaveList key={el.id} leaveObj={el} />
//         ))}
//       </div>
//       <div>
//         <SubmitButton className="rounded-xl w-20 m-3 hover:bg-green-400">
//           Edit
//         </SubmitButton>
//         <SubmitButton className="rounded-xl w-20 bg-[#2463EB] hover:bg-blue-400">
//           Add
//         </SubmitButton>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import DefaultLeaveList from "./DefaultLeaveList";
import SubmitButton from "../../../components/SubmitButton";
import useManage from "../../../hooks/use-manage";

export default function ManageLeaveSetting() {
  const { getAllLeaveProfile } = useManage();
  const [input, setInput] = useState([]);

  useEffect(() => {
    getAllLeaveProfile()
      .then((res) => {
        setInput(res.data.allLeaveProfile);
        console.log(input);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full flex flex-col m-auto items-center gap-3 p-10 mx-72 bg-gray-200 rounded-lg">
      <h1 className="text-lg font-bold">Default Leaves</h1>
      <div className="flex flex-col gap-3">
        {input.map((el) => (
          <DefaultLeaveList key={el.id} leaveObj={el} input={input} />
        ))}
      </div>
      <div>
        <SubmitButton className="rounded-xl w-20 m-3 hover:bg-green-400">
          Edit
        </SubmitButton>
        <SubmitButton className="rounded-xl w-20 bg-[#2463EB] hover:bg-blue-400">
          Add
        </SubmitButton>
      </div>
    </div>
  );
}
