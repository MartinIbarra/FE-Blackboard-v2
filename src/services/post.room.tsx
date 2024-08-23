import { useState } from "react";
// import { RoomListI } from "../types/room.types";

export const usePostRoom = () => {
  // const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [data, setData] = useState<RoomListI | []>([]);
  const [reload] = useState<boolean>(false);

  const postData = async (room: string) => {
    setIsLoading(true);
    console.log(room);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const parsedData = JSON.stringify({
      room,
    });

    const response = await fetch("http://localhost:5000/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
      body: parsedData,
    });

    console.log("response => ", response);
  };

  return { postData, isLoading, reload };
};
