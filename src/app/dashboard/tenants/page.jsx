"use client";

import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import DataContext from "@/context/DataContext";

function Tenants() {
  const { profile, userData } = useContext(UserContext);
  const { occupancy } = useContext(DataContext);

  // logic
  const tenants = profile?.filter((dt) => dt?.lords_id === userData?.id);
  console.log(tenants);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default Tenants;
