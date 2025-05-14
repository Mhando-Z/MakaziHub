"use client";

import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, MapPin, Tag, Bed, Bath, Key, Check, Copy } from "lucide-react";
import OccupancyForm from "@/compponents/OccupancyForm";
import DataContext from "@/context/DataContext";
import OccupancyDetails from "@/compponents/OccupancyDetails";
import UserContext from "@/context/UserContext";
import TenantDetails from "@/compponents/TenantDetails";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function HouseDetailsCard({ house }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const amenities = house.description.split(", ").map((item) => item.trim());
  const { occupancy } = useContext(DataContext);
  const { profile } = useContext(UserContext);
  const [Occupancy, setOccupancy] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [copied, setCopied] = useState(false);

  //   handles copying data to clipboard
  const copyToClipboard = () => {
    if (house?.id) {
      navigator.clipboard
        .writeText(house.id)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  //  occupancy allocation based on house-id
  const handleOccupancy = () => {
    const Occupancy = occupancy?.find((dt) => dt?.house_id === house?.id);
    setOccupancy(Occupancy);
    const tenants = profile?.find((dt) => dt?.house_id === house?.id);
    setTenant(tenants);
  };

  useEffect(() => {
    handleOccupancy();
  }, []);

  return (
    <motion.div className="bg-white  overflow-hidden w-full">
      {/* Header */}
      <div
        className={`bg-gradient-to-r justify-between ${
          Occupancy
            ? "from-green-600 to-green-700"
            : "from-blue-600 to-blue-800"
        }  flex flex-col md:flex-row  to-blue-800 p-6 text-white`}
      >
        <div>
          <div className="flex items-center mb-2">
            <Home className="mr-2" />
            <h2 className="text-xl font-bold">
              {" "}
              {formatPrice(house.house_price)}
            </h2>
          </div>
          <div className="flex items-center text-blue-100 text-sm mb-2">
            <MapPin size={16} className="mr-1" />
            <span>
              {house.street}, {house.region}
            </span>
          </div>
          <div className="text-blue-200 text-sm">
            <span>{house.purpose}</span>
          </div>
        </div>
        {/* id section */}

        <div className="">
          <div className="flex items-center gap-2">
            <Key size={16} className="text-white" />
            <h2 className="font-medium text-white">House key</h2>
          </div>
          <div className="flex items-center gap-2">
            <code className="  px-3 py-1 rounded text-white font-mono">
              {house?.id || "No ID available"}
            </code>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center p-2 rounded-md hover:bg-gray-700 transition-colors"
              title="Copy house ID"
            >
              {copied ? (
                <Check size={16} className="text-white" />
              ) : (
                <Copy size={16} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Property details */}
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <Tag size={25} className="text-blue-600 mr-2" />
            <div>
              <div className="text-gray-500 text-xs">Type</div>
              <div className="font-medium capitalize">{house.type}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Bed size={25} className="text-blue-600 mr-2" />
            <div>
              <div className="text-gray-500 text-xs">Bedrooms</div>
              <div className="font-medium">{house.bedrooms}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Bath size={25} className="text-blue-600 mr-2" />
            <div>
              <div className="text-gray-500 text-xs">Bathrooms</div>
              <div className="font-medium">{house.bathrooms}</div>
            </div>
          </div>
        </div>

        {/* tenant details */}
        {Occupancy ? (
          <div className="mt-4">
            <TenantDetails tenant={tenant} />
          </div>
        ) : (
          ""
        )}

        {/* description section */}
        <div className="py-2">
          <h1 className="font-bold">House Description</h1>
          <p className="text-xs md:text-sm">{house?.description}</p>
        </div>

        {Occupancy ? (
          <>
            {/* occupancy details */}
            <div className="mt-4">
              <OccupancyDetails occupancyData={Occupancy} />
            </div>
          </>
        ) : (
          <>
            {/* Occupancy form */}
            <div className="mt-4">
              <OccupancyForm house={house} occupancy={Occupancy} />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
