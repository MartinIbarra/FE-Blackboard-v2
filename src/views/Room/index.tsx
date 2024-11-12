import React from "react";

const Room: React.FC<{ name: string; roomID: number; roomsLength: number }> = ({
  name,
  roomID,
  roomsLength,
}) => {
  return (
    <div
      className={`${
        roomID < roomsLength ? "divide-solid divide-y divide-white" : ""
      }`}
    >
      <p className="text-xl">{name}</p>
    </div>
  );
};

export default Room;
