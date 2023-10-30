import PersonalDetails from "../../../components/Profile/PersonalDetails";

export default function PersonalProfilePage() {
  return (
    <div>
      <div className="bg-primaryGreen w-full py-11">
        <div className="relative flex justify-center items-center">
          <img
            src="https://cdn.pixabay.com/photo/2018/03/31/21/18/african-american-3279360_1280.jpg"
            className="w-[158px] h-[158px] border rounded-full absolute"
          />
        </div>
      </div>
      <PersonalDetails />
    </div>
  );
}
