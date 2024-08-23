import { Button } from "flowbite-react";
import React, { ReactNode } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { socket } from "../socket";

// type Props = {
//   children: ReactNode;
// };

const Layout: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen w-screen">
      <nav className="flex h-10 w-full justify-end bg-[#DC5F00] px-4 py-2">
        <Button
          className="flex items-center"
          onClick={() => {
            socket.disconnect;
            navigate("/");
          }}
        >
          Disconnect
        </Button>
      </nav>
      {/* <div className="flex p-4 w-full">
        {isConnected ? (
          <span className="rounded-full bg-green-500 w-5 h-5"></span>
        ) : (
          <span className="rounded-full bg-red-500 w-5 h-5"></span>
        )}
      </div> */}
      <Outlet />
    </div>
  );
};

export default Layout;
