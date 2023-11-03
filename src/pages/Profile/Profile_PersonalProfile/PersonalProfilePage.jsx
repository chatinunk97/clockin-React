import { Link } from "react-router-dom";
import SubmitButton from "../../../components/SubmitButton";
import PersonalDetails from "./PersonalDetails";
import Avatar from "../../../components/Avatar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/use-auth";
import { useEffect } from "react";
import { clockAxios } from "../../../config/axios";

export default function PersonalProfilePage() {
  const [profileUser, setProfileUser] = useState(null);
  const { userId } = useParams();
  const { authUser } = useAuth();
  const isAuthUser = authUser.id === +userId;

  useEffect(() => {
    clockAxios
      .get(`/user/${userId}`)
      .then((res) => {
        setProfileUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div>
      {profileUser ? (
        <>
          <div className="relative flex justify-center items-center bg-primaryGreen w-full py-11">
            <Avatar
              src={
                isAuthUser ? authUser.profileImage : profileUser?.profileImage
              }
              className="w-[158px] h-[158px] border rounded-full absolute"
            />
          </div>
          <PersonalDetails profileUser={profileUser} />
          <div className="text-center mt-10">
            <Link to="/profile/record">
              <SubmitButton>View Calendar</SubmitButton>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="text-center p-8 text-3xl font-bold">
          404 !!! user not found
        </h1>
      )}
    </div>
  );
}
