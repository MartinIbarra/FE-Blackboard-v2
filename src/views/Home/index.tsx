import React from "react";
import Blackboard from "../Blackboard";
// import ChatMessages from "../UsersChat/ChatMessages";
import UsersChat from "../UsersChat";

const Home: React.FC = () => {
  return (
    <div className="flex w-full">
      <Blackboard />
      <UsersChat />
    </div>
  );
};

export default Home;
