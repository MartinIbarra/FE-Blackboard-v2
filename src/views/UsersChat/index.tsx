import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { socket } from "../../socket";
import { SocketMsgI } from "../../types/socket.types";
import { useLocation } from "react-router-dom";
import { globalState } from "../../store";
import { useHookstate } from "@hookstate/core";
import ChatMessages from "./ChatMessages";
import { SubmitBtn } from "../../components/ChatForm/SubmitBtn";
import { ChatInput } from "../../components/ChatForm/ChatInput";

const UsersChat: React.FC = () => {
  const [input_msg, set_input_msg] = useState<string>("");
  const { userCredentials } = useHookstate(globalState);
  const [msgList, setMsgList] = useState<SocketMsgListI[] | []>([]);
  const { state } = useLocation();

  interface SocketMsgListI {
    msg: string;
    from: string;
  }

  useEffect(() => {
    socket.on("socketMsg", (data: SocketMsgI): void => {
      setMsgList((prev: SocketMsgListI[]): SocketMsgListI[] => {
        if (prev.length > 0) {
          return [...prev, { msg: data.msg, from: data.socket_email }];
        }
        return [{ msg: data.msg, from: data.socket_email }];
      });
    });

    return () => {
      socket.off("socketMsg");
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    socket.emit("socketMsg", {
      msg: input_msg,
      socket_email: userCredentials.get().email,
      room: state.room,
    });
    set_input_msg("");
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    set_input_msg(event?.target.value || "-- No input --");
  };

  return (
    <div className="flex flex-col w-full h-full justify-end">
      {msgList.length > 0 &&
        msgList.map((msg: SocketMsgListI, idx: number) => {
          // const isFromSocket = msg.from === userCredentials.get().email;
          return <ChatMessages key={idx} socket_msg={msg} />;
        })}
      <form className="flex w-full" onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          value={input_msg}
          onChange={onChangeInputHandler}
        />
        <SubmitBtn primary={true} label="send" />
      </form>
    </div>
  );
};

export default UsersChat;
