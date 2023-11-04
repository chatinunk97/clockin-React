import PersonalDetailList from "./PersonalDetailList";

export default function PersonalDetails({ profileUser }) {
  return (
    <div>
      {profileUser && (
        <h1 className="pt-14 font-bold text-[36px] text-center">
          {profileUser.firstName} {profileUser.lastName}
        </h1>
      )}
      <div className="flex flex-col px-8">
        <PersonalDetailList
          listName="Employee ID"
          listInfo={profileUser.employeeId}
        />
        <PersonalDetailList
          listName="Position"
          listInfo={profileUser.position}
        />
        <PersonalDetailList listName="Supervisor" listInfo="Jack Maa" />
        <PersonalDetailList
          listName="Phone Number"
          listInfo={profileUser.mobile}
        />
        <PersonalDetailList listName="Email" listInfo={profileUser.email} />
      </div>
    </div>
  );
}
