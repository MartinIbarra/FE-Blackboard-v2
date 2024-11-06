import React from "react";
import Room from "../Room";
import { Link } from "react-router-dom";
import { RoomI, RoomListI } from "../../types/room.types";
import { socket } from "../../socket";
import { useHookstate } from "@hookstate/core";
import { globalState } from "../../store";

const RoomList: React.FC<{ rooms: RoomListI; }> = ({ rooms }) => {
  const { userCredentials } = useHookstate(globalState);

  return (
    <div className="bg-[#6C5F5B] p-2 rounded-md w-full">
      {rooms &&
        rooms.map((room: RoomI, i: number) => (
          <Link
            key={i}
            to={`/room`}
            onClick={() => {
              socket.emit("joinRoom", {
                room: room.room,
                socket_cred: userCredentials.get(),
              });
            }}
            state={{ room: room.room }}
          >
            <Room name={room.room} roomID={i} roomsLength={rooms.length} />
          </Link>
        ))}
    </div>
  );
};

export default RoomList;
