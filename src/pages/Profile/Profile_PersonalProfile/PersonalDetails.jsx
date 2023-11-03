import PersonalDetailList from "./PersonalDetailList";

export default function PersonalDetails({ profileUser }) {
  console.log(profileUser[0]);
  return (
    <div>
      {profileUser[0] && (
        <h1 className="pt-14 font-bold text-[36px] text-center">
          {profileUser[0].firstName} {profileUser[0].lastName}
        </h1>
      )}
      <div className="flex flex-col px-8">
        <PersonalDetailList
          listName="Employee ID"
          listInfo={profileUser[0].employeeId}
        />
        <PersonalDetailList
          listName="Position"
          listInfo={profileUser[0].position}
        />
        <PersonalDetailList listName="Supervisor" listInfo="Jack Maa" />
        <PersonalDetailList
          listName="Phone Number"
          listInfo={profileUser[0].mobile}
        />
        <PersonalDetailList listName="Email" listInfo={profileUser[0].email} />
      </div>
    </div>
  );
}
