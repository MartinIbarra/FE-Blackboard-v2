// import { Button } from "flowbite-react";
import React from "react";
import { Outlet } from "react-router-dom";
// import { socket } from "../socket";
import { useHookstate } from "@hookstate/core";
import { globalState } from "../store";
import UserAvatar from "../components/UserAvatar";
import GoogleSignInBtn from "../components/GoogleSignInBtn";
import UsersList from "../components/UsersList";

const Layout: React.FC = () => {
  const {
    // isConnected,
    // socket_name,
    // socket_list,
    userCredentials
  } = useHookstate(globalState);
  // isConnected.set(socket.connected);

  return (
    <div className="flex flex-col h-screen w-screen">
      <nav className="flex w-full justify-end bg-[#DC5F00] px-4 py-2">
        {
          userCredentials.get().name === '' ? (
            <GoogleSignInBtn />
          ) : (
            <UserAvatar />
          )
        }
      </nav>
      <div className="flex p-4 w-full gap-2">
        {userCredentials.get().name !== "" ? (
          <div className="flex gap-1 items-center">
            <span className="flex rounded-full bg-green-500 w-5 h-5"></span> <p className="flex">{userCredentials.get().name}</p>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <span className="flex rounded-full bg-red-500 w-5 h-5"></span> <p className="flex">{userCredentials.get().name}</p>
          </div>
        )}
        <div className="flex gap-1">
         <UsersList />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
