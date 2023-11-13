import PersonalDetailList from "./PersonalDetailList";

export default function PersonalDetails({ profileUser }) {
  return (
    <div className="lg:w-96 lg:m-auto overflow-hidden overflow-y-auto pt-20">
      {profileUser && (
        <p className="pt-16 font-bold text-[36px] text-center">
          {profileUser.firstName} {profileUser.lastName}
        </p>
      )}
      <div className="flex flex-col px-8 gap-10">
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
