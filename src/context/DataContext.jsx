"use client";

import { createContext, useEffect, useState } from "react";
import { supabase1, supabase2 } from "@/Config/Supabase";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [roomData, setRoom] = useState([]);
  const [room_status, setRoomStatus] = useState([]);

  // fetch quotes
  const fetchQts = async () => {
    const { data, error } = await supabase1.from("Quotes").select("*");
    if (!error) {
      setQuotes(data);
    }
  };

  const fetchRoom = async () => {
    const { data: room, error } = await supabase2.from("room").select("*");
    if (!error) {
      setRoom(room);
    }
  };
  const fetchRoomStatus = async () => {
    const { data: room_occupancy, error } = await supabase2
      .from("room_occupancy")
      .select("*");
    if (!error) {
      setRoomStatus(room_occupancy);
    }
  };

  useEffect(() => {
    fetchRoom();
    fetchQts();
    fetchRoomStatus();
  }, []);

  return (
    <DataContext.Provider value={{ quotes, roomData, room_status, fetchRoom }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
