import { Link } from "react-router-dom";
import PersonalDetails from "../../../components/Profile/PersonalDetails";
import SubmitButton from "../../../components/SubmitButton";

export default function PersonalProfilePage() {
  return (
    <div>
      <div className="relative flex justify-center items-center bg-primaryGreen w-full py-11">
        <img
          src="https://cdn.pixabay.com/photo/2018/03/31/21/18/african-american-3279360_1280.jpg"
          className="w-[158px] h-[158px] border rounded-full absolute"
        />
      </div>

      <PersonalDetails />

      <div className="text-center mt-10">
        <Link to="/profile/record">
          <SubmitButton>View Calendar</SubmitButton>
        </Link>
      </div>
    </div>
  );
}
