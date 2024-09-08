import React from "react";
import Room from "../Room";
import { Link } from "react-router-dom";
import { RoomI, RoomListI } from "../../types/room.types";
import { socket } from "../../socket";
import { useHookstate } from "@hookstate/core";
import { globalState } from "../../store";

const RoomList: React.FC<{
  rooms: RoomListI;
  inputName: string;
  validateName: () => boolean;
}> = ({ rooms, inputName, validateName }) => {
  const { socket_name } = useHookstate(globalState);

  return (
    <div className="bg-[#6C5F5B] p-2 rounded-md w-full">
      {rooms &&
        rooms.map((room: RoomI, i: number) => (
          <Link
            key={i}
            to={`/room`}
            onClick={(e) => {
              if (!validateName()) {
                e.preventDefault();
              }
              socket_name.set(inputName);
              socket.emit("joinRoom", {
                room: room.room,
                socket_name: inputName,
              });
            }}
            state={{ room: room.room, socket_name: inputName }}
          >
            <Room name={room.room} roomID={i} roomsLength={rooms.length} />
          </Link>
        ))}
    </div>
  );
};

export default RoomList;
