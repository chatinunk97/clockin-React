import RegisterFrom from "./RegisterFrom";

export default function RegisterMainPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-950">
      <div className="flex flex-col justify-center items-center p-6">
        <h1 className="text-4xl font-bold text-white p-4">Register Company</h1>
        <div className=" bg-white flex flex-col justify-center items-center shadow-xl rounded-xl">
          <RegisterFrom />
        </div>
      </div>
    </div>
  );
}
