import { useEffect, useState } from "react";
import { RoomListI } from "../types/room.types";

export const useGetRooms = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<RoomListI | []>([]);
  const [reload] = useState<boolean>(false);

  const getData = async () => {
    setIsLoading(true);

    const response = await fetch("http://localhost:5000/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      // localStorage.setItem("token", json.token);
      setData(json);
    }
  };

  useEffect(() => {
    getData();
  }, [reload]);

  return { data, isLoading, error, reload };
};
