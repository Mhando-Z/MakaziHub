"use client";

import DataContext from "@/context/DataContext";
import UserContext from "@/context/UserContext";
import React, { useContext } from "react";

function HouseWidget() {
  const { profile, userData, houses } = useContext(UserContext);
  const { occupancy, roomData } = useContext(DataContext);

  //   find houses linked to user
  const filerdHouse = houses?.filter((dt) => dt?.user_id === userData?.id);
  // filter for rented house
  const filterRentHouse = filerdHouse?.filter(
    (dt) => dt?.purpose === "Rent House"
  );
  // filter active houses
  const filterOccHouse = filterRentHouse?.filter(
    (dt) => dt?.tenant_id !== null
  );

  // room section
  const filteredRooms = filerdHouse
    ?.map((dt) => roomData?.filter((dta) => dta?.house_id === dt?.id))
    .flat();
  // vaccant rooms
  const filterVaccantRooms = filteredRooms?.filter(
    (dt) => dt?.is_occupied === false
  );
  // vaccant rooms
  const filterOccuRooms = filteredRooms?.filter(
    (dt) => dt?.is_occupied === true
  );

  return (
    <div className="p-6">
      <div></div>
    </div>
  );
}

export default HouseWidget;
