import React from "react";

export default function InfoClockinItem({ clockTime, type }) {
  return (
    <div className="shadow-md bg-gray-50 flex flex-col justify-center items-center p-2 rounded-md font-semibold w-full h-full">
      {/* <p>Phaya Thai Office</p> */}
      <p>{type}</p>
      <p>{clockTime}</p>
    </div>
  );
}
