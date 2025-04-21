"use client";

import { supabase2 } from "@/Config/Supabase";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase2.auth.getUser();

    if (user) {
      setUser({ id: user.id, email: user.email });
    } else {
      console.error("Error getting user:", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export default UserContext;
