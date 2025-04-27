"use client";

import { createContext, useEffect, useState } from "react";
import { supabase1, supabase2 } from "@/Config/Supabase";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [houseData, setHouse] = useState([]);

  // fetch quotes
  const fetchQts = async () => {
    const { data, error } = await supabase1.from("Quotes").select("*");
    if (!error) {
      setQuotes(data);
    }
  };

  const fetchHouse = async () => {
    const { data: house, error } = await supabase2.from("house").select("*");
    if (!error) {
      setHouse(house);
    }
  };

  useEffect(() => {
    fetchHouse();
    fetchQts();
  }, []);

  return (
    <DataContext.Provider value={{ quotes, houseData }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
