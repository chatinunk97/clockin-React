import { Link } from "react-router-dom";
import SubmitButton from "../../../components/SubmitButton";
import PersonalDetails from "./PersonalDetails";
import Avatar from "../../../components/Avatar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../../hooks/use-auth";
import { useEffect } from "react";
import { clockAxios } from "../../../config/axios";
import Loading from "../../../components/Loading";

export default function PersonalProfilePage() {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { authUser } = useAuth();
  const isAuthUser = authUser.id === +userId;

  useEffect(() => {
    clockAxios
      .get(`/user/getUser/${userId}`)
      .then((res) => {
        setProfileUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(profileUser)
        setLoading(false);
      });
  }, [userId]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {profileUser ? (
            <>
              <div className="relative flex justify-center items-center bg-primaryGreen w-full py-11">
                <Avatar
                  src={
                    isAuthUser
                      ? authUser.profileImage
                      : profileUser?.profileImage
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
              <br></br>
              <Link to="/profile/people">
                  <SubmitButton>Back to people List ?</SubmitButton>
                </Link>
            </h1>
          )}
        </>
      )}
    </div>
  );
}
