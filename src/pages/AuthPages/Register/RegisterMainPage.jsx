import RegisterFrom from "./RegisterFrom";

export default function RegisterMainPage() {
  return <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-950">
    <h1 className="text-4xl font-bold text-white p-4">Register</h1>
    <div className="w-[800px] bg-white flex flex-col justify-center items-center shadow-xl rounded-xl">
      <RegisterFrom />
    </div>
  </div>;
}
