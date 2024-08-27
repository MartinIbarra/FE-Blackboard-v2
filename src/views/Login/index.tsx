import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Button } from "flowbite-react";
import RoomList from "../Home/RoomList";
import { socket } from "../../socket";
import { RoomListI } from "../../types/room.types";
import { theme } from "../../theme/theme";
import { globalState } from "../../store";
import { useHookstate } from "@hookstate/core";

// import RoomList from "./RoomList";
// import { RoomListI } from "../../types/room.types";
// import { usePostRoom } from "../../services/post.room";

// let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

// const ENDPOINT = "localhost:5000";

// interface RoomList {
//   name: string;
// }

const Login: React.FC<{ rooms_list: RoomListI }> = ({ rooms_list }) => {
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [joinRoom, setJoinRoom] = useState<boolean>(true);
  const [roomNameError, setRoomNameError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const navigate = useNavigate();
  // const [room_list, set_room_list] = useState<RoomI[] | []>([]);
  // const [data, setData] = useState<
  //   [] | [{ id: number; name: string; email: string }]
  // >([]);

  const { socket_name } = useHookstate(globalState);

  const validateName = () => {
    if (name.length <= 0) {
      setNameError("Necesitamos un nombre primero");
      return false;
    }

    if (name.length >= 12) {
      setNameError("El nombre tiene que tener menos de 12 caracteres");
      return false;
    }
    socket_name.set(name);
    return true;
  };

  const validateRoomName = () => {
    if (roomName.length <= 0) {
      setRoomNameError("Necesitamos un nombre primero");
      return false;
    }

    if (roomName.length >= 12) {
      setRoomNameError("El nombre tiene que tener menos de 12 caracteres");
      return false;
    }

    return true;
  };

  const createRoom = () => {
    if (validateName() && validateRoomName()) {
      socket_name.set(name);
      socket.emit("createRoom", { room: roomName, socket_name: name });
      socket.emit("joinRoom", {
        room: roomName,
        socket_name: name,
      });
      navigate("/room", { state: { room: roomName, socket_name: name } });
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-96 h-full m-auto">
      <div className="flex gap-4 mb-4">
        <span
          className="cursor-pointer transition duration-300 hover:text-primary"
          onClick={() => setJoinRoom(true)}
        >
          Join room
        </span>
        <span
          className="cursor-pointer transition duration-300 hover:text-primary"
          onClick={() => setJoinRoom(false)}
        >
          Create room
        </span>
      </div>
      <div className="relative z-0 w-full mb-5 group text-white">
        <FloatingLabel
          className="text-white focus:border-[#DC5F00]"
          value={name}
          onChange={(e) => setName(e?.target.value)}
          variant="standard"
          label="Name"
          theme={theme}
          color={"default"}
        />
        {nameError.length > 0 && (
          <span className="text-red-700"> {nameError}</span>
        )}
      </div>
      {joinRoom ? (
        <div>
          {rooms_list.length > 0 && (
            <RoomList
              validateName={validateName}
              inputName={name}
              rooms={rooms_list}
            />
          )}
        </div>
      ) : (
        <div className="relative z-0 w-full mb-5 group">
          <FloatingLabel
            value={roomName}
            className="text-white transition ease-in duration-400 focus:border-[#DC5F00]"
            onChange={(e) => setRoomName(e?.target.value)}
            variant="standard"
            theme={theme}
            label="Create room"
          />
          {roomNameError.length > 0 && (
            <span className="text-red-700"> {roomNameError}</span>
          )}
        </div>
      )}
      {!joinRoom && (
        <Button
          className="w-32 bg-primary focus:border-none enabled:border-none"
          onClick={() => createRoom()}
        >
          Create
        </Button>
      )}
    </div>
  );
};

export default Login;
