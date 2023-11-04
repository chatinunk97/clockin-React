import { Link } from "react-router-dom";
import Avatar from "../../../components/Avatar";

export default function PeopleItem({ peopleObj }) {
  return (
    <Link to={`/profile/${peopleObj.id}`}>
      <div className="flex  bg-inputGray hover:bg-primaryGreen border rounded-[16px] mt-6 mx-6 pl-6 py-3 items-center">
        {peopleObj.profileImage ? (
          <img
            src={`${peopleObj.profileImage}`}
            alt=""
            className="h-[60px] w-[60px] border rounded-full "
          />
        ) : (
          <Avatar />
        )}
        <div className="pl-10">
          <h2 className="font-bold">
            {peopleObj.firstName} {peopleObj.lastName}
          </h2>
          <h3>{peopleObj.position}</h3>
        </div>
      </div>
    </Link>
  );
}
