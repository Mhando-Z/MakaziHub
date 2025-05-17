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
    <div className="min-h-screen flex flex-col">
      {/* header section */}
      <div>
        <h1>List of Tenants</h1>
        <div className="flex flex-col h-[500px] mt-4 overflow-y-scroll">
          {tenants?.map((dt, index) => {
            return <div>{dt?.full_name}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Tenants;
