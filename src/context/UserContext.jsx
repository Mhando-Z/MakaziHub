"use client";

import { supabase2 } from "@/Config/Supabase";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [Tprofile, setTprofile] = useState([]);
  const [userData, setUserdata] = useState(null);

  const getUserData = () => {
    if (user && profile.length > 0) {
      const matched = profile.find((item) => item.id === user.id);
      if (matched) setUserdata(matched);
    }
  };

  const getProfile = async () => {
    const { data, error } = await supabase2.from("profiles").select("*");
    if (data) setProfile(data);
    else console.error("Profile fetch error:", error.message);
  };

  const getTProfile = async () => {
    const { data, error } = await supabase2.from("tenant").select("*");
    if (data) setTprofile(data);
    else console.error("Profile fetch error:", error.message);
  };

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase2.auth.getUser();
    if (user) setUser({ id: user.id, email: user.email });
    else console.error("User fetch error:", error?.message);
  };

  useEffect(() => {
    getUser();
    getProfile();
    getTProfile();

    // Listen for login/logout
    const { data: listener } = supabase2.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          getUser();
          getProfile();
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setUserdata(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe(); // cleanup
    };
  }, []);

  useEffect(() => {
    getUserData();
  }, [user, profile]);

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        Tprofile,
        getUserData,
        setUser,
        setUserdata,
        getUser,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
