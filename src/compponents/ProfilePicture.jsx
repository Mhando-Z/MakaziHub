import React, { useContext, useEffect } from "react";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { motion } from "framer-motion";
import UserContext from "@/context/UserContext";
import { usePathname } from "next/navigation";

function ProfilePictures() {
  const { user, userData } = useContext(UserContext);
  const pathname = usePathname();

  useEffect(() => {}, [userData, user, pathname]);

  return (
    <div className="flex items-center p-3 rounded-lg bg-white shadow-sm border border-gray-100">
      <div className="flex-shrink-0 mr-3">
        {user !== null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <motion.img
              src={`https://ui-avatars.com/api/?name=${user?.email}&background=EEF2FF&color=6366F1`}
              alt="User Avatar"
              className="h-12 w-12 rounded-full object-cover border-2 border-green-400 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
          </motion.div>
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex flex-col   mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate mr-2">
            {userData?.full_name || "Guest User"}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {user?.email || "No email provided"}
          </p>
          <div>
            {userData?.role === "landlord" ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <HiMiniCheckBadge className="mr-1" />
                landlord
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <HiMiniCheckBadge className="mr-1" />
                tenant
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePictures;
