"use client";

const { createContext } = require("react");

const DataContext = createContext();

export function DataProvider({ children }) {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}

export default DataContext;
