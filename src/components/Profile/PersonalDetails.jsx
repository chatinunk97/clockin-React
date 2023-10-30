import PersonalDetailList from "./PersonalDetailList";

export default function PersonalDetails({
  firstName,
  lastName,
  number,
  position,
  supervisor,
}) {
  return (
    <div>
      <h1 className="pt-14 font-bold text-[36px] text-center">
        Victoria Robertson
      </h1>
      <div className="flex flex-col px-8">
        <PersonalDetailList listName="Number" listInfo="001" />
        <PersonalDetailList listName="Position" listInfo="Sales Manager" />
        <PersonalDetailList listName="Supervisor" listInfo="Jack Maa" />
      </div>
    </div>
  );
}
