import PeopleItem from "./PeopleItem";

export default function PeopleList({ allPeople }) {
  return (
    <div>
      {allPeople.map((el) => (
        <PeopleItem key={el.id} peopleObj={el} />
      ))}
    </div>
  );
}
// export default function PeopleList({ image, firstName, lastName, position }) {
//   return (
//     <div className="flex  bg-inputGray hover:bg-primaryGreen border rounded-[16px] mt-6 mx-6 pl-6 py-3 items-center">
//       <img
//         src={`${image}`}
//         alt=""
//         className="h-[60px] w-[60px] border rounded-full "
//       />
//       <div className="pl-10">
//         <h2 className="font-bold">
//           {firstName} {lastName}
//         </h2>
//         <h3>{position}</h3>
//       </div>
//     </div>
//   );
// }
