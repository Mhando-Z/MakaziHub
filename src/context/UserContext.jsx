"use client";

import { supabase2 } from "@/Config/Supabase";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [userData, setUserdata] = useState([]);

  //   filter user profile by id
  const filterUser = profile.filter((item) => item.id === user.id);
  //   set user data to profile
  useEffect(() => {
    if (filterUser.length > 0) {
      setUserdata(filterUser[0]);
    }
  }, [filterUser]);

  //   get user profiles
  const getProfile = async (user) => {
    const { data: profiles, error } = await supabase2
      .from("profiles")
      .select("*");

    if (profiles) {
      setProfile(profiles);
    } else {
      console.error("Error getting user:", error.message);
    }
  };

  //   get user email and id
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
    getProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, userData, getProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
