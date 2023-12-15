import React from "react";

export default function InfoClockinItem({ clockTime, type }) {
  return (
    <div className="shadow-md bg-gray-50 flex flex-col gap-2 justify-center items-center p-2 rounded-md w-full">
      <p className="font-bold text-xl whitespace-nowrap">Phaya Thai Office</p>
      <p>{type}</p>
      <p className="text-xl font-semibold">{clockTime}</p>
    </div>
  );
}
