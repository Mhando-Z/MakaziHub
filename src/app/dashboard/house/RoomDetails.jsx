"use client";

import { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  Tag,
  Bed,
  Bath,
  Key,
  Check,
  Copy,
  DollarSign,
} from "lucide-react";
import OccupancyForm from "@/compponents/OccupancyForm";
import DataContext from "@/context/DataContext";
import OccupancyDetails from "@/compponents/OccupancyDetails";
import UserContext from "@/context/UserContext";
import TenantDetails from "@/compponents/TenantDetails";
import RoomOccupancyForm from "@/compponents/RoomOccupyFom";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function RoomDetailsCard({ room, house, setShowRoomDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { occupancy } = useContext(DataContext);
  const [showEdit, setShowEdit] = useState(false);
  const { profile } = useContext(UserContext);
  // const [Occupancy, setOccupancy] = useState([]);
  // const [tenant, setTenant] = useState([]);
  const [copied, setCopied] = useState(false);

  //   handles copying data to clipboard
  const copyToClipboard = () => {
    if (room?.id) {
      navigator.clipboard
        .writeText(room.id)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  //  occupancy allocation based on room-id
  const Occupancy = occupancy?.find((dt) => dt?.room_id === room?.id);
  //  tenants allocation based on room-id
  const tenant = profile?.find((dt) => dt?.room_id === room?.id);

  const isEndDateInCurrentMonth = () => {
    const today = new Date();
    const endDate = new Date(Occupancy?.end_date);

    return (
      today?.getMonth() === endDate?.getMonth() &&
      today?.getFullYear() === endDate?.getFullYear()
    );
  };

  // Check if we should show the reminder

  const showEndDateReminder = isEndDateInCurrentMonth();

  return (
    <motion.div className="bg-white  overflow-hidden w-full">
      {/* Header */}
      <div
        className={`bg-gradient-to-r justify-between ${
          showEndDateReminder
            ? "from-red-600 to-red-900"
            : Occupancy
            ? "from-green-600 to-green-900"
            : "from-blue-600 to-blue-900"
        }  flex flex-col md:flex-row  to-blue-800 p-6 text-white`}
      >
        <div>
          <div className="flex items-center mb-2">
            <Home className="mr-2" />
            <h2 className="text-xl font-bold">{room.room_name}</h2>
          </div>
          <div className="flex items-center mb-2">
            <DollarSign size={20} className="mr-2 " />
            <h2 className="text-lg font-bold">
              {formatPrice(room.rent_price)}
            </h2>
          </div>
          <div className="flex items-center text-blue-100 text-sm mb-2">
            <MapPin size={16} className="mr-1" />
            <span>
              {house?.street}, {house?.region}
            </span>
          </div>
        </div>
        {/* id section */}

        <div className="">
          <div className="flex items-center gap-2">
            <Key size={16} className="text-white" />
            <h2 className="font-medium text-white">room key</h2>
          </div>
          <div className="flex items-center gap-2">
            <code className="  px-3 py-1 rounded text-white font-mono">
              {room?.id || "No ID available"}
            </code>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center p-2 rounded-md hover:bg-gray-700 transition-colors"
              title="Copy room ID"
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
        {/* tenant details */}
        {Occupancy ? (
          <div className="mt-4">
            <TenantDetails tenant={tenant} />
          </div>
        ) : (
          ""
        )}

        {Occupancy ? (
          <>
            {/* occupancy details */}
            <div className="mt-4">
              <OccupancyDetails
                occupancyData={Occupancy}
                setShowEdit={setShowEdit}
                showEdit={showEdit}
              />
            </div>
          </>
        ) : (
          <>
            {/* Occupancy form */}
            <div className="mt-4">
              <RoomOccupancyForm
                room={room}
                occupancy={Occupancy}
                setShowRoomDetails={setShowRoomDetails}
              />
            </div>
          </>
        )}

        {/* Occupancy form */}
        {showEdit && (
          <div className="mt-4">
            <OccupancyForm
              room={room}
              showEdit={showEdit}
              occupancy={Occupancy}
              setShowEdit={setShowEdit}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
