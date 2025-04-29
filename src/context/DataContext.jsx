"use client";

import { createContext, useEffect, useState } from "react";
import { supabase1, supabase2 } from "@/Config/Supabase";
import { jwtDecode } from "jwt-decode";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [roomData, setRoom] = useState([]);

  // fetch quotes
  const fetchQts = async () => {
    const { data, error } = await supabase1.from("Quotes").select("*");
    if (!error) {
      setQuotes(data);
    }
  };

  const fetchRoom = async () => {
    const { data: room, error } = await supabase2.from("house").select("*");
    if (!error) {
      setHouse(house);
    }
  };

  useEffect(() => {
    fetchRoom();
    fetchQts();
  }, []);

  return (
    <DataContext.Provider value={{ quotes, roomData }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
