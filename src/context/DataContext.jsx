"use client";

import { createContext, useEffect, useState } from "react";
import { supabase1, supabase2 } from "@/Config/Supabase";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [roomData, setRoom] = useState([]);
  const [room_status, setRoomStatus] = useState([]);
  const [occupancy, setOccupancy] = useState([]);

  // fetch quotes
  const fetchQts = async () => {
    const { data, error } = await supabase1.from("Quotes").select("*");
    if (!error) {
      setQuotes(data);
    }
  };
  const fetchOccupancy = async () => {
    const { data, error } = await supabase2.from("occupancy").select("*");
    if (!error) {
      setOccupancy(data);
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
    fetchOccupancy();
  }, []);

  return (
    <DataContext.Provider
      value={{
        quotes,
        roomData,
        occupancy,
        room_status,
        fetchRoom,
        fetchOccupancy,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
