import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingLabel, Button } from "flowbite-react";
import RoomList from "../Home/RoomList";
import { socket } from "../../socket";
import { RoomListI } from "../../types/room.types";
import { theme } from "../../theme/theme";
import { globalState } from "../../store";
import { useHookstate } from "@hookstate/core";

const Login: React.FC<{ rooms_list: RoomListI }> = ({ rooms_list }) => {
  const [roomName, setRoomName] = useState<string>("");
  const [roomNameError, setRoomNameError] = useState<string>("");
  const navigate = useNavigate();
  const { userCredentials } = useHookstate(globalState);

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
    if (
      validateRoomName() &&
      userCredentials.get().name &&
      userCredentials.get().name !== ""
    ) {
      // console.log(`name => ${userCredentials.get().name}`);
      // console.log(`roomName => ${roomName}`);
      socket.emit("createRoom", {
        room: roomName,
        socket_cred: userCredentials.get(),
      });
      socket.emit("joinRoom", {
        room: roomName,
        socket_cred: userCredentials.get(),
      });
      navigate("/room", { state: { room: roomName } });
    } else {
      setRoomNameError("Name not valid.");
    }
  };

  return (
    <div className="flex justify-center w-full p-4">
      <div className="flex p-4 justify-center w-full">
        <div className="flex flex-col gap-4 justify-center items-center w-96 h-full m-auto">
          <div className="flex gap-4 mb-4">
            <span className="transition duration-300 hover:text-primary">
              Create room
            </span>
          </div>
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
          <Button
            className="w-32 bg-primary focus:border-none enabled:border-none"
            onKeyDown={() => setRoomNameError("")}
            onClick={() => createRoom()}
          >
            Create
          </Button>
        </div>
      </div>
      <div className="flex p-2 w-1/6">
        {rooms_list.length > 0 && <RoomList rooms={rooms_list} />}
      </div>
    </div>
  );
};

export default Login;
