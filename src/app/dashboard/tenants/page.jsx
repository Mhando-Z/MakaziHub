"use client";

import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";

function Tenants() {
  const { profile, userData } = useContext(UserContext);

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
