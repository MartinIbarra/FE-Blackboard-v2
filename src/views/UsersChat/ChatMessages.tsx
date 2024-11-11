import { useHookstate } from "@hookstate/core";
import React from "react";
import { globalState } from "../../store";

const ChatMessages: React.FC<{
  socket_msg: { msg: string; from: string };
}> = ({ socket_msg }) => {
  const { userCredentials } = useHookstate(globalState);

  const isFromSocket = socket_msg.from === userCredentials.get().email;

  if (!isFromSocket) {
    return (
      <p className={`flex bg-green-300 justify-end`}>
        {socket_msg.msg}
        {" :"}
        {userCredentials.get().name}
      </p>
    );
  }
  return (
    <p className={`flex bg-red-300 justify-start`}>
      {userCredentials.get().name}
      {": "}
      {socket_msg.msg}
    </p>
  );
};

export default ChatMessages;
