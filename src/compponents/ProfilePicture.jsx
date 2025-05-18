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
    <>
      <div className="flex flex-row   justify-between w-full text-gray-900 md:justify-between md:flex-row gap-y-7 gap-x-3">
        <div className=" ">
          {/* profile images */}
          {user !== null ? (
            <>
              <motion.img
                src={`https://ui-avatars.com/api/?name=${user?.email}`}
                alt="User Avatar"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="object-cover h-5 w-full border-4 border-green-300 rounded-full"
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex flex-col flex-grow">
          {/* data details and status */}
          <h1 className="font-bold line-clamp-1">{userData?.full_name}</h1>
          <h1 className="text-sm  font-medium text-gray-700 line-clamp-1">
            {user?.email}
          </h1>
          {/* status */}
          {userData?.role === "landlord" ? (
            <div className="flex flex-row items-center w-full gap-x-1">
              <>
                <h1 className="text-sm">Admin</h1>
              </>
              <HiMiniCheckBadge className="text-blue-700 gap-x-10" />
            </div>
          ) : (
            <div className="flex flex-row items-center w-full gap-x-1">
              <>
                <h1 className="text-sm">User</h1>
              </>
              <HiMiniCheckBadge className="text-green-700 gap-x-10" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePictures;
