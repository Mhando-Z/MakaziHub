"use client";

import DataContext from "@/context/DataContext";
import UserContext from "@/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Home, Key } from "lucide-react";

function HouseWidget() {
  const { profile, userData, houses, gethHouse } = useContext(UserContext);
  const { occupancy, roomData, fetchRoom } = useContext(DataContext);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    gethHouse();
    fetchRoom();
  }, []);

  //   handles copying data to clipboard
  const copyToClipboard = () => {
    if (userData?.id) {
      navigator.clipboard
        .writeText(userData.id)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

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
  // Occupied rooms
  const filterOccuRooms = filteredRooms?.filter(
    (dt) => dt?.is_occupied === true
  );

  return (
    <div className="mb-10">
      {/* id section */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Key size={16} className="" />
          <h2 className="font-medium">LandLord's key</h2>
        </div>
        <div className="flex items-center gap-2">
          <code className="  px-3 py-1 rounded  font-mono">
            {userData?.id || "No ID available"}
          </code>
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center p-2 rounded-md hover:bg-gray-300 transition-colors"
            title="Copy landlords ID"
          >
            {copied ? (
              <Check size={16} className="" />
            ) : (
              <Copy size={16} className="" />
            )}
          </button>
        </div>
      </div>
      {/* house widgets */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {/* totatl houses */}
        <StatCard
          title={"Total Houses"}
          value={filerdHouse?.length}
          icon={<Home size={30} className="text-blue-600" />}
        />
        {/* totatl Rent houses */}
        <StatCard
          title={"Total Rent Houses"}
          value={filterRentHouse?.length}
          icon={<Home size={30} className="text-yellow-600" />}
        />
        {/* totatl Rent houses */}
        <StatCard
          title={"Total Occupied Houses"}
          value={filterOccHouse?.length}
          icon={<Home size={30} className="text-green-600" />}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {/* totatl Rooms */}
        <StatCard
          title={"Total Rooms"}
          value={filteredRooms?.length}
          icon={<Home size={30} className="text-purple-600" />}
        />
        {/* totatl Rent houses */}
        <StatCard
          title={"Total Vaccant Rooms"}
          value={filterVaccantRooms?.length}
          icon={<Home size={30} className="text-red-600" />}
        />
        {/* totatl Rent houses */}
        <StatCard
          title={"Total Occupied Rooms"}
          value={filterOccuRooms?.length}
          icon={<Home size={30} className="text-green-600" />}
        />
      </div>
    </div>
  );
}

export default HouseWidget;

// // Dashboard Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md p-4 ${color}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-sm md:text-base text-gray-500">
            {title}
          </p>
          <h3 className="text-xl md:text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div
          className={`p-2 rounded-full ${
            color === "border-l-green-500"
              ? "bg-green-100"
              : color === "border-l-red-500"
              ? "bg-red-100"
              : color === "border-l-blue-500"
              ? "bg-blue-100"
              : color === "border-l-yellow-500"
              ? "bg-yellow-100"
              : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
